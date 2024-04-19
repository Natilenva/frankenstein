function zodErrorMap(zodIssues) {
    const errors = {};

    zodIssues.forEach((issue) => {
        const propName = issue.path[0];
        const message = issue.message;

        if (!errors[propName]) {
            errors[propName] = [message];
            return;
        }

        errors[propName] = [...errors[propName], message];
    });

    return errors;
}

export { zodErrorMap };
