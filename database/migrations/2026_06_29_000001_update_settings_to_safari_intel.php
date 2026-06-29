<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateSettingsToSafariIntel extends Migration
{
    private function applySettings(array $values)
    {
        if (!\Schema::hasTable('settings')) {
            return;
        }

        $updates = [];
        foreach ($values as $column => $value) {
            if (\Schema::hasColumn('settings', $column)) {
                $updates[$column] = $value;
            }
        }

        if (!empty($updates)) {
            DB::table('settings')->update($updates);
        }
    }

    public function up()
    {
        $this->applySettings([
            'CompanyName' => 'Safari Intel',
            'CompanyPhone' => '0754092850',
            'CompanyAdress' => 'Makerere',
            'footer' => 'YourPos - Ultimate Inventory With POS',
            'developed_by' => 'christian',
        ]);
    }

    public function down()
    {
        $this->applySettings([
            'CompanyName' => 'Stocky',
            'CompanyPhone' => '6315996770',
            'CompanyAdress' => '3618 Abia Martin Drive',
            'footer' => 'Stocky - Ultimate Inventory With POS',
            'developed_by' => 'Stocky',
        ]);
    }
}
