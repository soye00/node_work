const express = require('express');
const supabase = require('../utils/supa.js');
const router = express.Router();

router.get('/', async (req, res) => {

    const {data:reservationData, error} =
        await supabase.from('ice_res')
            .select()
            .eq('status', '결제완료');

    const {data:waitReservationData} =
        await supabase.from('ice_res')
            .select()
            .eq('status', '청소대기');

    const {data:completeReservationData} =
        await supabase.from('ice_res')
            .select()
            .eq('status', '청소완료');

    console.log(req.session.user);

    return res.render('cleaner/index', {
        title: 'Cleaner',
        reservationData,
        waitReservationData,
        completeReservationData,
        user: req.session.user,
    });
});

router.post('/', async (req, res) => {
    console.log('여기오나');
    console.log(req.body);
    console.log(req.session.user);
    if (!req.session.user) {
        return res.json({status: 'fail'});
    }

    const {data, error} =
        await supabase.from('ice_clean')
            .insert([{
                cleaner_id: req.session.user.id,
                res_no: req.body.res_no,
                recipient_name: req.session.user.name,
                phone: req.session.user.phone,
                address: req.session.user.address,
                clean_status: '대기',
            }])
            .select();

    await supabase.from('ice_res')
        .update({'status': '청소대기'})
        .eq('res_no', req.body.res_no);

    if(error){
        return res.json({status: 'server'});
    }

    return res.json({status: 'success'});
})

router.post('/complete', async (req, res) => {
    console.log('청소완료 처리 요청');
    console.log(req.body);
    console.log(req.session.user);

    if (!req.session.user) {
        return res.json({status: 'fail', message: '로그인이 필요합니다.'});
    }

    try {
        const { res_no, memo, files } = req.body;

        // 파일들을 Supabase Storage에 업로드
        const uploadedFilePaths = [];

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileName = `clean-${Date.now()}-${Math.round(Math.random() * 1E9)}.${file.type.split('/')[1]}`;

                // Base64 데이터를 Buffer로 변환
                const base64Data = file.data.split(',')[1];
                const buffer = Buffer.from(base64Data, 'base64');

                // Supabase Storage에 업로드
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('ice')
                    .upload(fileName, buffer, {
                        contentType: file.type,
                        cacheControl: '3600'
                    });

                if (uploadError) {
                    console.error('파일 업로드 오류:', uploadError);
                    return res.json({status: 'error', message: '파일 업로드 중 오류가 발생했습니다.'});
                }

                // 공개 URL 생성
                const { data: urlData } = supabase.storage
                    .from('ice')
                    .getPublicUrl(fileName);

                uploadedFilePaths.push(urlData.publicUrl);
            }
        }

        // 청소 완료 데이터를 데이터베이스에 저장
        const {data: completeData, error: completeError} = await supabase
            .from('ice_clean_complete')
            .insert([{
                cleaner_id: req.session.user.id,
                res_no: res_no,
                memo: memo,
                images: uploadedFilePaths,
                completed_at: new Date().toISOString(),
                cleaner_name: req.session.user.name
            }])
            .select();

        if (completeError) {
            console.error('청소완료 데이터 저장 오류:', completeError);
            return res.json({status: 'error', message: '데이터 저장 중 오류가 발생했습니다.'});
        }

        // 예약 상태를 '청소완료'로 업데이트
        const {error: updateError} = await supabase
            .from('ice_res')
            .update({'status': '청소완료'})
            .eq('res_no', res_no);

        if (updateError) {
            console.error('예약 상태 업데이트 오류:', updateError);
            return res.json({status: 'error', message: '상태 업데이트 중 오류가 발생했습니다.'});
        }

        return res.json({status: 'success', message: '청소완료 처리가 성공적으로 완료되었습니다.'});

    } catch (error) {
        console.error('청소완료 처리 오류:', error);
        return res.json({status: 'error', message: '서버 오류가 발생했습니다.'});
    }
});

module.exports = router;