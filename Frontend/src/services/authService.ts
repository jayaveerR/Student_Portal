const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'faculty' | 'CR';
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: User;
    errors?: Array<{ msg: string; param: string }>;
}

class AuthService {
    // Register new user
    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success && result.token) {
                this.setToken(result.token);
                this.setUser(result.user);
            }

            return result;
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                message: 'Network error. Please check if the backend server is running.',
            };
        }
    }

    // Login user
    async login(data: LoginData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success && result.token) {
                this.setToken(result.token);
                this.setUser(result.user);
            }

            return result;
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'Network error. Please check if the backend server is running.',
            };
        }
    }

    // Logout user
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Get stored token
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    // Set token
    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    // Get current user
    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    // Set user data
    setUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export default new AuthService();
