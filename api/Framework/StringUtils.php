<?php

namespace App\Framework;

class StringUtils
{
    public static function snakeToPascalCase($string)
    {
        // Split the string into words
        $words = explode('_', $string);

        // Capitalize each word and join them together
        $pascalCase = implode('', array_map(function ($word) {
            return ucfirst($word);
        }, $words));

        // Return the result
        return $pascalCase;
    }
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

    public static function singularize($word)
    {
        $length = strlen($word);

        // Rule 1: Ends with 'es', remove 'es'
        if (substr($word, -2) === 'es') {
            $word = substr($word, 0, -2);
        }
        // Rule 2: Ends with 'ies', replace 'ies' with 'y'
        else if (substr($word, -3) === 'ies') {
            $word = substr($word, 0, -3) . 'y';
        }
        // Rule 3: Ends with 's', remove 's'
        else if (substr($word, -1) === 's') {
            $word = substr($word, 0, -1);
        }

        return $word;
    }
}
