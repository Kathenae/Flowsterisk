<?php

namespace App\Framework;

class StringUtils
{
    public static function toSnakeCase($text)
    {
        // To snake_case
        $result = '';
        for ($i = 0; $i < strlen($text); $i++) {
            $char = $text[$i];
            if ($i > 0 && ctype_upper($char)) {
                $result .= '_';
            }
            $result .= strtolower($char);
        }
        return $result;
    }

    public static function pluralize($word)
    {
        if (!preg_match('/[aeiou]y$/i', $word)) {
            return $word . 's';
        }

        if (preg_match('/[aeiou]y$/i', $word)) {
            return substr($word, 0, -1) . 'ies';
        }

        return $word;
    }
}
