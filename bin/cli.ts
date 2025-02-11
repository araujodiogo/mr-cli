#!/usr/bin/env node

import { program } from 'commander';
import { configureNewProject } from '../src/index.js';
import chalk from 'chalk';

program
    .name('quick-monorepo')
    .description('Quickly prepare a typescript monorepo for development')
    .version('1.0.0')
    .argument('<project-directory>', 'Project name')
    .action((directory: string) => {
        console.log(chalk.blue(`Starting project in ${directory}...`));
        configureNewProject(directory);
    });

program.parse(process.argv);
