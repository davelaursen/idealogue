class NotFoundSvc {
    middleware = (req: any, res: any) => {
        this.send404(req, res, 'API endpoint not found');
    }

    send404(req: any, res: any, description?: string) {
        let data = {
            status: 404,
            message: 'Not Found',
            description: description
        };
        res.status(404).send(data).end();
    }
}

export default new NotFoundSvc();
