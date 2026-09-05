<?php

namespace Api\Modules\Data;

    use Illuminate\Contracts\Support\Arrayable;

class DestinationData implements Arrayable {

    public function __construct(
        /**
         * The id of the destination row on the ombu_destinations table
         */
        public ?int $destinationId,

        /**
         * The user friendly label for this destination
         * @var string
         */
        public string $label,

        /**
         * Whether this destination is enabled (Default to true, since most modules don't have this ability)
         */
        public bool $enabled = true,

        /**
         * Whether this destination enabled state can be toggled (most modules don't allow this)
         * @var bool
         */
        public bool $canToggleEnabledState = false,
    ){ 
    }

    public function toArray(): array {
        return [
            'destination_id' => $this->destinationId,
            'label' => $this->label,
            'enabled' => $this->enabled,
            'can_toggle_enabled_state' => $this->canToggleEnabledState
        ];
    }
}