<?php

namespace Api\Modules;

use Api\Modules\Data\DestinationData;
use Api\Modules\Module;
use Api\Framework\Validation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Validation\Validator;

class Ivr extends Module {
    use HasFactory;
    
    public function getDestinationData(): array {
        $destination_ids = [];
        $ivr_entries = $this->getConnection()->table('ombu_ivr_entries')->where('ivr_id', $this->getId())->get();
        if(isset($ivr_entries) && count($ivr_entries) > 0) {
            foreach($ivr_entries as $entry) {
                $option_number = $entry->option;
                $key = "option_" . $option_number . "_destination_id";
                $destination_ids[$key] = new DestinationData($entry->destination_id, $key);
            }
        }
        return [
            ...$destination_ids,
            ...parent::getDestinationData(),
        ];
    }
}