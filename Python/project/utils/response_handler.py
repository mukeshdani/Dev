class ResponseHandler:
    @staticmethod
    def success(message):
        return {"status": "success", "message": message}, 200

    @staticmethod
    def error(message):
        return {"status": "error", "message": message}, 400
