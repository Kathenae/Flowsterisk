<?php

namespace Api\Modules;

use Api\Framework\Validation;
use Api\Modules\Data\DestinationData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Validation\Validator;

class DynamicDestination extends Module
{
    use HasFactory;

    public function getKeyName()
    {
        return 'id';
    }

    public function getDestinationData(): array
    {
        $destination_ids = [];
        $conditions = $this->getConnection()->table('ombu_dynamic_destinations_conditions')->where('dynamic_destination_id', $this->getId())->get();
        if (isset($conditions) && count($conditions) > 0) {
            foreach ($conditions as $key => $entry) {
                $option_number = $entry->condition_id;
                $key = "option_" .($key + 1). "_destination_id";
                $destination_ids[$key] = new DestinationData($entry->destination_id, $key);
            }
        }
        return [
            ...$destination_ids,
            ...parent::getDestinationData(),
        ];
    }
}