<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Departemen;
use App\Enums\RolesEnum;
use App\Enums\ProductStatusEnum;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class FictitiousB2BSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Define Fictitious Companies (Vendors)
        $companies = [
            [
                'name' => 'PT. Agrikultur Nusantara Jaya',
                'shop_name' => 'PT. Agrikultur Nusantara Jaya',
                'company_number' => 'NIB 912000111222',
                'factory_location' => 'Jl. Perkebunan Raya No. 12, Ambon, Maluku',
                'production_capacity' => '50.000 Ton Cengkeh & Rempah per Tahun',
                'email' => 'agro@nusantara.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'PT. Bahari Sejahtera Makmur',
                'shop_name' => 'PT. Bahari Sejahtera Makmur',
                'company_number' => 'NIB 912000333444',
                'factory_location' => 'Kawasan Pelabuhan Bitung Kav. B4, Bitung, Sulawesi Utara',
                'production_capacity' => '25.000 Ton Tuna & Seafood Beku per Tahun',
                'email' => 'bahari@sejahtera.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'PT. Mineral Bumi Khatulistiwa',
                'shop_name' => 'PT. Mineral Bumi Khatulistiwa',
                'company_number' => 'NIB 912000555666',
                'factory_location' => 'Kawasan Tambang Kutai Barat, Kutai Kartanegara, Kalimantan Timur',
                'production_capacity' => '1.500.000 Metrik Ton Batubara per Tahun',
                'email' => 'mineral@khatulistiwa.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'PT. Rimba Lestari Abadi',
                'shop_name' => 'PT. Rimba Lestari Abadi',
                'company_number' => 'NIB 912000777888',
                'factory_location' => 'Jl. Mebel Teakwood No. 89, Jepara, Jawa Timur',
                'production_capacity' => '120.000 Meter Kubik Plywood & Teak per Tahun',
                'email' => 'rimba@lestari.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'PT. Sarang Walet Emas',
                'shop_name' => 'PT. Sarang Walet Emas',
                'company_number' => 'NIB 912000999000',
                'factory_location' => 'Jl. Walet Sentosa No. 4, Deli Serdang, Sumatera Utara',
                'production_capacity' => '5.000 Kg Sarang Burung Walet Premium per Tahun',
                'email' => 'walet@emas.com',
                'password' => Hash::make('password'),
            ]
        ];

        $vendorUsers = [];

        foreach ($companies as $companyData) {
            // Check if user already exists
            $user = User::where('email', $companyData['email'])->first();
            if (!$user) {
                $user = User::create($companyData);
                $user->assignRole(RolesEnum::Vendor->value);
            }
            $vendorUsers[$companyData['email']] = $user;
        }

        // 2. Define High-Quality B2B Products
        $productsData = [
            // --- PT. Agrikultur Nusantara Jaya ---
            [
                'vendor_email' => 'agro@nusantara.com',
                'title' => 'Cengkeh Kering Premium Lalpari (Dried Cloves)',
                'description' => '<p>Cengkeh Lalpari kering kualitas ekspor premium langsung dari perkebunan subur kepulauan Maluku. Dipanen secara manual, dikeringkan di bawah sinar matahari alami, serta melalui proses sortasi ganda untuk memastikan kadar air rendah dan aroma rempah yang sangat kuat.</p><p><strong>Spesifikasi:</strong></p><ul><li>Kadar Air: &lt; 12%</li><li>Bahan Asing: &lt; 0.5%</li><li>Warna: Cokelat Kemerahan Lalpari</li><li>Kemasan: Karung Goni 50 Kg / Custom Bag</li></ul>',
                'price' => 5.50,
                'quantity' => 15000,
                'departemen_name' => 'Agriculture',
                'category_name' => 'Cloves',
                'image_url' => 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600&auto=format&fit=crop'
            ],
            [
                'vendor_email' => 'agro@nusantara.com',
                'title' => 'Kayu Manis Batang Ekspor Grade A (Cinnamon Sticks)',
                'description' => '<p>Kayu manis batang kering berkualitas tinggi (Grade A) asal Kerinci, Jambi. Sangat populer di industri makanan, minuman, dan farmasi global karena kandungan minyak atsiri yang pekat serta rasa manis-pedas alami yang khas.</p><p><strong>Spesifikasi:</strong></p><ul><li>Panjang Batang: 8 - 10 cm</li><li>Kadar Air: &lt; 14%</li><li>Ketebalan Kulit: 1 - 2 mm</li><li>Kemasan: Kardus Karton Ekspor 25 Kg</li></ul>',
                'price' => 3.80,
                'quantity' => 8000,
                'departemen_name' => 'Agriculture',
                'category_name' => 'Cinnamon Sticks',
                'image_url' => 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=600&auto=format&fit=crop'
            ],
            [
                'vendor_email' => 'agro@nusantara.com',
                'title' => 'Lada Hitam Bulat Lampung Kering (Black Pepper)',
                'description' => '<p>Lada hitam bulat Lampung berkualitas tinggi yang telah mendunia. Melalui pengolahan modern untuk memastikan kebersihan, higienitas, bebas dari kontaminasi zat asing, dan mempertahankan tingkat kepedasan piperin maksimal.</p><p><strong>Spesifikasi:</strong></p><ul><li>Densitas: 500 - 550 g/l</li><li>Kadar Air: &lt; 13%</li><li>Bahan Asing: &lt; 1%</li><li>Kemasan: Karung Double PP 25 Kg</li></ul>',
                'price' => 6.20,
                'quantity' => 12000,
                'departemen_name' => 'Agriculture',
                'category_name' => 'Black Pepper',
                'image_url' => 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop'
            ],

            // --- PT. Bahari Sejahtera Makmur ---
            [
                'vendor_email' => 'bahari@sejahtera.com',
                'title' => 'Udang Vannamei Kupas Beku Premium (Frozen Vannamei Shrimp)',
                'description' => '<p>Udang Vannamei kupas beku (Peeled and Deveined) kualitas ekspor premium langsung dari tambak budidaya modern berkelanjutan di Bitung. Dibekukan secara instan dengan teknologi IQF (Individual Quick Freezing) untuk menjaga kesegaran rasa, nutrisi, dan tekstur kenyal udang alami.</p><p><strong>Spesifikasi:</strong></p><ul><li>Tipe: Peeled & Deveined, Tail-Off</li><li>Ukuran (Sizing): 21/25, 26/30, 31/40</li><li>Metode Beku: IQF</li><li>Kemasan: Plastik Vakum Food Grade dalam Master Box 10 Kg</li></ul>',
                'price' => 9.50,
                'quantity' => 20000,
                'departemen_name' => 'Marine & Fisheries',
                'category_name' => 'Vannamei Shrimp',
                'image_url' => 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop'
            ],
            [
                'vendor_email' => 'bahari@sejahtera.com',
                'title' => 'Daging Tuna Sirip Kuning Beku (Frozen Yellowfin Tuna Loin)',
                'description' => '<p>Loin tuna sirip kuning (Yellowfin Tuna) kualitas ekspor premium, ditangkap secara berkelanjutan dengan metode handline di perairan dalam Maluku & Sulawesi. Sangat ideal untuk kebutuhan restoran sushi, steakhouse, dan pasar ritel global.</p><p><strong>Spesifikasi:</strong></p><ul><li>Tipe: Skinless, Boneless, CO Treated / Non-CO</li><li>Suhu Simpan: -18°C hingga -20°C</li><li>Berat per Loin: 2 - 4 Kg</li><li>Kemasan: Master Box Karton Tebal 20 Kg</li></ul>',
                'price' => 14.80,
                'quantity' => 5000,
                'departemen_name' => 'Marine & Fisheries',
                'category_name' => 'Yellowfin Tuna',
                'image_url' => 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=600&auto=format&fit=crop'
            ],

            // --- PT. Mineral Bumi Khatulistiwa ---
            [
                'vendor_email' => 'mineral@khatulistiwa.com',
                'title' => 'Batubara Kalori Tinggi GAR 5000 (Thermal Coal)',
                'description' => '<p>Batubara termal kalori tinggi GAR 5000 diproduksi langsung dari konsesi tambang Kutai Barat, Kalimantan Timur. Sangat cocok untuk kebutuhan pembangkit listrik tenaga uap (PLTU) dan peleburan industri berat di seluruh belahan dunia.</p><p><strong>Spesifikasi:</strong></p><ul><li>Nilai Kalori: GAR 5000 kcal/kg</li><li>Total Sulfur: &lt; 0.8%</li><li>Total Ash: &lt; 8%</li><li>Pengiriman: FOB Vessel / Barge</li></ul>',
                'price' => 78.00,
                'quantity' => 100000,
                'departemen_name' => 'Minerals & Energy',
                'category_name' => 'Thermal Coal',
                'image_url' => 'https://images.unsplash.com/photo-1518364538800-6bcb3f25da49?q=80&w=600&auto=format&fit=crop'
            ],
            [
                'vendor_email' => 'mineral@khatulistiwa.com',
                'title' => 'Karbon Aktif Tempurung Kelapa (Coconut Activated Carbon)',
                'description' => '<p>Karbon aktif kualitas tinggi yang terbuat dari bahan baku tempurung kelapa pilihan terbaik Indonesia. Memiliki luas permukaan pori-pori yang sangat luas untuk efektivitas absorbsi maksimal dalam pemurnian air, industri pertambangan emas, gas mask, dan filtrasi limbah.</p><p><strong>Spesifikasi:</strong></p><ul><li>Iodine Value: 800 - 1100 mg/g</li><li>Ukuran Mesh: 8x30, 4x8, 8x16</li><li>Kadar Air: &lt; 5%</li><li>Kemasan: Kantong Woven PP 25 Kg / Big Bag 500 Kg</li></ul>',
                'price' => 11.50,
                'quantity' => 25000,
                'departemen_name' => 'Minerals & Energy',
                'category_name' => 'Activated Carbon',
                'image_url' => 'https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=600&auto=format&fit=crop'
            ],

            // --- PT. Rimba Lestari Abadi ---
            [
                'vendor_email' => 'rimba@lestari.com',
                'title' => 'Gelondongan Kayu Jati Legal Perhutani (Teak Wood Logs)',
                'description' => '<p>Kayu Jati (Tectona grandis) gelondongan kualitas super bersertifikat legalitas kayu resmi (SVLK) Perhutani. Memiliki serat kayu lurus berpola indah, kadar minyak alami tinggi untuk ketahanan rayap, dan sangat ideal untuk industri pembuatan mebel luar ruangan dan dekorasi mewah.</p><p><strong>Spesifikasi:</strong></p><ul><li>Diameter: 30 - 49 cm</li><li>Panjang: 2 - 3 Meter</li><li>Sertifikasi: SVLK / FSC Certified</li><li>Tingkat Kering: Kering Log Alami</li></ul>',
                'price' => 180.00,
                'quantity' => 1200,
                'departemen_name' => 'Natural Earth Products',
                'category_name' => 'Teak Wood Logs',
                'image_url' => 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=600&auto=format&fit=crop'
            ],
            [
                'vendor_email' => 'rimba@lestari.com',
                'title' => 'Plywood Panel Meranti Ekspor 18mm',
                'description' => '<p>Plywood kayu lapis Meranti dengan ketebalan 18mm kualitas ekspor premium untuk kebutuhan konstruksi bangunan, pelapisan interior mewah, pembuatan lemari, dan bekisting struktural berkekuatan tinggi.</p><p><strong>Spesifikasi:</strong></p><ul><li>Tebal: 18 mm (+/- 0.2mm)</li><li>Bahan Inti (Core): Kayu Meranti Merah</li><li>Lem Perekat: WBP / MR Glue E0 Grade</li><li>Dimensi: 1220 x 2440 mm</li></ul>',
                'price' => 19.50,
                'quantity' => 6000,
                'departemen_name' => 'Natural Earth Products',
                'category_name' => 'Plywood Panels',
                'image_url' => 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop'
            ],

            // --- PT. Sarang Walet Emas ---
            [
                'vendor_email' => 'walet@emas.com',
                'title' => 'Sarang Burung Walet Bersih Mangkok Super (Edible Bird Nest)',
                'description' => '<p>Sarang burung walet putih berbentuk mangkok utuh kualitas ekspor super premium. Dipanen secara higienis dari rumah walet binaan sendiri di Sumatera Utara, dibersihkan secara tradisional menggunakan air murni tanpa pemutih kimiawi, bahan pengawet, maupun zat aditif lainnya.</p><p><strong>Spesifikasi:</strong></p><ul><li>Bentuk: Mangkok Sempurna (Cup Shape)</li><li>Lebar: 7 - 9 cm</li><li>Kemurnian: 99% Bebas Bulu & Kotoran</li><li>Kemasan: Box Plastik Vakum dengan Sterofoam Pelindung Benturan</li></ul>',
                'price' => 1250.00,
                'quantity' => 350,
                'departemen_name' => 'Livestock & Animal Products',
                'category_name' => 'Edible Bird Nest',
                'image_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
            ],
            [
                'vendor_email' => 'walet@emas.com',
                'title' => 'Kulit Sapi Asli Hasil Samak Krom Premium (Cow Hide Leather)',
                'description' => '<p>Lembaran kulit sapi asli hasil proses penyamakan krom berkualitas tinggi dari sentra industri kulit Jawa Timur. Sangat lentur, memiliki pola alami yang konsisten, dan sangat direkomendasikan untuk produsen tas kulit premium, sepatu mewah, dompet, dan pelapis jok mobil.</p><p><strong>Spesifikasi:</strong></p><ul><li>Tipe Kulit: Full Grain Leather</li><li>Tebal Kulit: 1.2 - 1.6 mm</li><li>Pilihan Warna: Black / Chestnut Brown / Tan</li><li>Sertifikasi: SNI / ISO Leather Standard</li></ul>',
                'price' => 42.00,
                'quantity' => 4500,
                'departemen_name' => 'Livestock & Animal Products',
                'category_name' => 'Cow Hide Leather',
                'image_url' => 'https://images.unsplash.com/photo-1524295988555-4674e3a240d8?q=80&w=600&auto=format&fit=crop'
            ]
        ];

        foreach ($productsData as $pData) {
            // Find department & category
            $dept = Departemen::where('name', $pData['departemen_name'])->first();
            $cat = Category::where('name', $pData['category_name'])->first();
            $vendor = $vendorUsers[$pData['vendor_email']];

            if ($dept && $cat && $vendor) {
                // Check if product already exists
                $slug = Str::slug($pData['title']);
                $product = Product::where('slug', $slug)->first();

                if (!$product) {
                    $product = Product::create([
                        'title' => $pData['title'],
                        'slug' => $slug,
                        'description' => $pData['description'],
                        'departemen_id' => $dept->id,
                        'category_id' => $cat->id,
                        'price' => $pData['price'],
                        'status' => ProductStatusEnum::Published->value,
                        'quantity' => $pData['quantity'],
                        'created_by' => $vendor->id,
                        'updated_by' => $vendor->id,
                    ]);

                    // Add high-resolution image via Spatie Media Library URL
                    try {
                        $product->addMediaFromUrl($pData['image_url'])
                            ->toMediaCollection('images');
                        Log::info("Successfully added image to product: {$product->title}");
                    } catch (\Exception $e) {
                        Log::warning("Could not download image for product '{$product->title}': " . $e->getMessage());
                    }
                }
            }
        }
    }
}
