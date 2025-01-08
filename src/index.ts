import simpleGit from 'simple-git';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

const GITHUB_REPO_URL = 'https://github.com/araujodiogo/monorepo-template.git';

export async function configureNewProject(directory: string) {
  try {
    const targetPath = path.resolve(process.cwd(), directory);

    if (fs.existsSync(targetPath)) {
      console.error(chalk.red(`Error: Directory ${directory} already exists.`));
      process.exit(1);
    }

    console.log(chalk.green('Creating typescript monorepo...'));

    const git = simpleGit();
    await git.clone(GITHUB_REPO_URL, targetPath);

    const gitFolderPath = path.join(targetPath, '.git');
    if (fs.existsSync(gitFolderPath)) {
      fs.rmSync(gitFolderPath, { recursive: true, force: true });
    }

    console.log(chalk.green(`Monorepo created in ${targetPath}. Happy coding 🎉`));
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red('Failed to set up project:'), error.message);
    } else {
      console.error(chalk.red('An unknown error occurred.'));
    }
    process.exit(1);
  }
}
