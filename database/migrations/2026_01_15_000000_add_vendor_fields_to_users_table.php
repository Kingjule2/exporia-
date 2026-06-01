<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('company_number')->nullable()->after('shop_name');
            $table->string('factory_location')->nullable()->after('company_number');
            $table->string('production_capacity')->nullable()->after('factory_location');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['company_number', 'factory_location', 'production_capacity']);
        });
    }
};
