# QuickFlip

QuickFlip is a project designed to support language learning by providing users with sets of flashcards.

You can learn and test yourself across 10 categories of basic Spanish words.
In learning mode, you can also listen to the correct pronunciation of studied words — integrated with ElevenLabs AI.

You can create an account, log into it, and manage your account data.\
To test authentication functionalities, you can either create a new account or use the demo credentials below:
 - email: demo.user@demo.com
 - password: 123Password678

QuickFlip is a Progressive Web Application (PWA), meaning you can install it and use it as a desktop app.\
Currently, work is ongoing to enable partial offline functionality.

## Future features
 - Enabling partial offline use
 - Email verification during registration
 - Password reset functionality
 - User progress tracking and dashboard statistics
 - Implementing a spaced repetition algorithm to optimize retention
 - Creating custom sets of flashcards across any category
 - Integrating AI assistance to generate flashcards based on user needs
 - Adding more learning modes

## Tech stack

![Static Badge](https://img.shields.io/badge/Next.js-%23000000?style=for-the-badge&logo=nextdotjs&labelColor=black) ![Static Badge](https://img.shields.io/badge/TypeScript-%233178C6?style=for-the-badge&logo=typescript&labelColor=black) ![Static Badge](https://img.shields.io/badge/Prisma-%232D3748?style=for-the-badge&logo=prisma&labelColor=black) ![Static Badge](https://img.shields.io/badge/Tailwind%20CSS-%2306B6D4?style=for-the-badge&logo=tailwindcss&labelColor=black) ![Static Badge](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990?style=for-the-badge&logo=reacthookform&labelColor=black) ![Static Badge](https://img.shields.io/badge/shadcn/ui-%23000000?style=for-the-badge&logo=shadcnui&labelColor=black) ![Static Badge](https://img.shields.io/badge/Cypress-%2369D3A7?style=for-the-badge&logo=cypress&labelColor=black) ![Static Badge](https://img.shields.io/badge/Jest-%23C21325?style=for-the-badge&logo=jest&labelColor=black) ![Static Badge](https://img.shields.io/badge/React%20Testing%20Library-%23E33332?style=for-the-badge&logo=testinglibrary&labelColor=black) ![Static Badge](https://img.shields.io/badge/ElevenLabs-%23000000?style=for-the-badge&logo=elevenlabs&labelColor=black) ![Static Badge](https://img.shields.io/badge/PostgreSQL-%234169E1?style=for-the-badge&logo=postgresql&labelColor=black) ![Static Badge](https://img.shields.io/badge/Docker-%232496ED?style=for-the-badge&logo=docker&labelColor=black) ![Static Badge](https://img.shields.io/badge/Nginx-%23009639?style=for-the-badge&logo=nginx&labelColor=black) ![Static Badge](https://img.shields.io/badge/GitHub%20Actions-%232088FF?style=for-the-badge&logo=githubactions&labelColor=black)

## Technical Details

QuickFlip's CI/CD pipeline is configured using GitHub Actions.\
When a pull request is created to merge into the master branch, the code is automatically tested. The pull request cannot be merged unless all tests pass successfully.\
After merging, the CD pipeline builds a Docker image, pushes it to Docker Hub, and then pulls it on an EC2 instance, where a container is created from the pulled image.\
On the server, Nginx handles incoming requests and redirects them to the running Docker container via a reverse proxy.

## You can use the app at https://quickflip-app.pl

## Contributions

Contributions to the project are not accepted.

## Author

Piotr Lechowicz, Lotusite

## License

The project has no official licence. The author retains copyright to the project and does not consent to its reproduction or commercial use by third parties.

## Status

The project is still under development but there is a stable production version, which can be used.

## Contact

Possible contact via email: kontakt@lotusite.pl
