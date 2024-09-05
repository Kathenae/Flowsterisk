<?php

namespace Api\Framework;

use Api\Framework\Console;

class Migration
{
    private string $directory;
    private string $journalFile;

    public function __construct(string $directory)
    {
        $this->directory = $directory;
        $this->journalFile = $directory . '/.journal';
    }


    public function migrate()
    {
        $journal = $this->readJournal();
        $migrations = $this->getMigrations();
        $migrations = $this->getMigrations();
        $appliedMigrations = [];
        foreach ($migrations as $migrationName => $migration) {
            if (!in_array($migrationName, $journal)) {
                Console::println("Applying migration \"$migrationName\"");
                $migration->up();
                array_push($journal, $migrationName);
                array_push($appliedMigrations, $migration);
            }
        }

        if(count($appliedMigrations) > 0){
            Console::println("Done!");
        } else {
            Console::println("No pending migrations.");
        }
        $this->writeJournal($journal);
    }

    public function rollback()
    {
        $journal = $this->readJournal();
        $latestMigrationName = array_pop($journal);
        if (!empty($latestMigrationName)) {
            $migration = require ($this->directory . '/' . $latestMigrationName . '.php');
            Console::println("Reverting migration \"$latestMigrationName\"");
            $migration->down();
            Console::println("Done!");
            $this->writeJournal($journal);
        } else {
            Console::println("No Migrations to revert!");
        }
    }

    private function readJournal()
    {
        $journal = file_get_contents($this->journalFile);
        $journal = trim($journal);
        $journal = rtrim($journal, "\n");
        $journal = str_replace(PHP_EOL, "\n", $journal);
        $journal = explode("\n", $journal);
        return $journal;
    }

    private function writeJournal(array $journal)
    {
        $journalText = implode("\n", $journal);
        file_put_contents($this->journalFile, $journalText);
    }

    private function getMigrations()
    {
        $migrationFiles = array_filter(scandir($this->directory), fn($file) => pathinfo($file, PATHINFO_EXTENSION) === 'php');
        $migrations = [];
        foreach ($migrationFiles as $migrationFile) {
            $migrationName = pathinfo($migrationFile, PATHINFO_FILENAME);
            $migration = require ($this->directory . '/' . $migrationFile);
            $migrations[$migrationName] = $migration;
        }
        return $migrations;
    }
}