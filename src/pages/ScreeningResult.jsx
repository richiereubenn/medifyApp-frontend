import Medi from '../assets/medi.png';

const ScreeningResult = () => {
    return (
        <div className="flex flex-col items-start justify-center h-full">
            <div className="flex w-full items-center justify-between rounded-xl bg-teal-600">
                <h1 className="text-2xl font-bold pl-4 text-white">Hasil Analisa & Diagnosa Awal</h1>
                <img
                    src={Medi}
                    alt="Medi"
                    className='w-32 h-32 pt-4' 
                />
            </div>

            <p className='py-4'>Berdasarkan gejala yang Anda sampaikan, berikut adalah hasil analisis kami:</p>

            <div className="flex w-full items-center justify-center">
                <div className="flex flex-col border w-full border-gray-300 rounded-xl bg-white">
                    <div className="flex gap-4 w-full items-center justify-between p-4">
                        <p className='font-semibold text-xl'>Kemungkinan Kondisi: <br /> Penyakit Pernapasan</p>
                        <div className='rounded-full border border-gray-300 p-2 bg-teal-600 text-white text-xl font-bold'>
                            <p className='px-2 py-3'>81%</p>
                        </div>
                    </div>
                    <div className="border-t w-full border-gray-300 p-4">
                        <p>Gejala yang Anda alami — seperti batuk, sesak napas, dan demam — sesuai dengan pola yang sering terlihat pada beberapa kondisi pernapasan.</p>
                    </div>
                </div>
            </div>
            <p className='py-4'>Catatan Penting: Untuk diagnosa resmi, Kami menyarankan Anda untuk berkonsultasi dengan tenaga medis profesional untuk pemeriksaan lebih lanjut.</p>
            <div className="py-4">
                <h2 className="font-semibold text-xl">Rekomendasi Tindakan Awal</h2>
                <ul className="list-disc pl-5">
                    <li>Istirahat yang cukup: Pastikan tubuh Anda beristirahat untuk mempercepat pemulihan.</li>
                    <li>Minum air putih: Tetap terhidrasi dengan baik sepanjang hari.</li>
                    <li>Hindari paparan polusi: Jauhi asap rokok atau area dengan polusi tinggi untuk sementara waktu.</li>
                </ul>
            </div>

            <a href="/hospital" className="py-4 text-center text-white w-full rounded-lg bg-teal-600 font-semibold">Lihat Rekomendasi Faskes</a> 
        </div>
    );
};

export default ScreeningResult;