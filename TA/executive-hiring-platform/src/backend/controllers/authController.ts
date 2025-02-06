export class AuthController {
    constructor(private authService: AuthService) {}

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await this.authService.login(username, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async register(req, res) {
        try {
            const userData = req.body;
            const newUser = await this.authService.register(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}