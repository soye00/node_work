const express = require('express');
const supabase = require('../utils/supa');
const router = express.Router();
const webpush = require('web-push');

router.get('/checkout', async function (req, res, next) {
    console.log(req.query);
    const {data, error} = await supabase.from('ice_res').select().eq('res_no', req.query.res_no);

    data[0].tel = data[0].tel.replace(/-/g, '')
    console.log(data[0].tel);
    res.render('pay/checkout', {title: "예약내역 결제", reservation: data[0]});
})

// 결제성공 -> ice_res 테이블에 res_no 예약번호 찾아서 결제완료 상태로 업데이트
router.get('/success', async function (req, res, next) {
    // console.log(req.query);
    // 결제완료 처리
    supabase.from('ice_res').update({status: '결제완료'}).eq('res_no', req.query.orderId);
    const {data} = await supabase.from('ice_res').select('*').eq('res_no', req.query.orderId);

    // 결제 완료 알림 푸시
    const {data: subData, error: subError} = await supabase
        .from('push_subscribe')
        .select('*');

    if (subError) {
        console.error('푸시 구독 정보 조회 실패:', subError);
    } else if (subData && subData.length > 0) {
        console.log("푸시 알림 전송 시도 - 구독자 수:", subData.length);

        // 모든 구독자에게 알림 전송
        for (const subscriber of subData) {
            const pushSubscription = {
                endpoint: subscriber.endpoint,
                keys: {
                    p256dh: subscriber.p256dh,
                    auth: subscriber.auth
                }
            };

            try {
                await webpush.sendNotification(
                    pushSubscription,
                    JSON.stringify({
                        title: '청소신청 알림',
                        body: '새로운 청소신청이 되었습니다',
                        url: '/'
                    })
                );
                console.log('푸시 알림 전송 성공');
            } catch (e) {
                console.error('푸시 알림 전송 실패:', e);
            }
        }
    } else {
        console.log('푸시 구독 정보가 없어 알림을 보내지 않습니다.');
    }

    return res.render('pay/success', {reservation: data[0]});
})


module.exports = router;