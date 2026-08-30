# API inconsistencies

- [authController.updateProfile](https://github.com/OpenClassrooms-Student-Center/dev-react-P10/blob/fe5fa162ce72cecee6584d0b87c23c7c15f8a69c/src/controllers/authController.ts#L320-L388), doesn't allow to update user's password. This means in the user's profile page updating the password won't work
- [projectController.updateProject](https://github.com/OpenClassrooms-Student-Center/dev-react-P10/blob/fe5fa162ce72cecee6584d0b87c23c7c15f8a69c/src/controllers/projectController.ts#L416-L419), doesn't allow to update project contributor. This means on a project's page updating the contributors won't work
- [taskController.createTask](https://github.com/OpenClassrooms-Student-Center/dev-react-P10/blob/fe5fa162ce72cecee6584d0b87c23c7c15f8a69c/src/controllers/taskController.ts#L41-L47), doesn't allow to set the task status. This means, when creating a new task, setting its status won't work

