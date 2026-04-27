export class AuthService {
  constructor(
    private readonly githubLoginUrl: string,
    private readonly githubAccessTokenUrl: string,
    private readonly githubUserUrl: string,
    private readonly githubClientId: string,
    private readonly githubClientSecret: string,
    private readonly githubRedirectUri: string,
    private readonly githubState: string,
  ) {}

  async register() {}
  async login() {}
  async githubLogin(data: any) {}
}
