function ErrorHandler({ isError = false, code = 404, children }) {
    if (!isError) return children;

    switch (code) {
        case 404:
            return 'Not Found';
    }
}

export default ErrorHandler;
