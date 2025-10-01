# PennyTrack - Personal Finance Tracking Mobile App

A modern personal finance tracking mobile application built with Angular 19 and Ionic 8, featuring secure AWS Cognito authentication and a multi-tenant architecture.

## 🚀 Features

- **Secure Authentication**: AWS Cognito integration with OAuth 2.0 PKCE flow
- **Transaction Management**: Create, read, update, and delete financial transactions
- **Multi-Tenant Architecture**: Group-based data segregation for secure multi-user support
- **Custom Fields**: Configure custom accounts, categories, and responsible parties
- **Transaction Filtering**: Advanced filtering by date, account, category, and responsible party
- **Modern UI**: Built with Ionic 8 components for a native mobile experience
- **Cross-Platform**: Runs on iOS, Android, and web using Capacitor

## 📋 Tech Stack

- **Framework**: Angular 19
- **Mobile Framework**: Ionic 8
- **Mobile Runtime**: Capacitor 7
- **Authentication**: AWS Cognito (PKCE Flow)
- **Backend**: AWS API Gateway
- **Language**: TypeScript 5.6
- **Testing**: Karma + Jasmine

## 🛠️ Prerequisites

Before you begin, ensure you have installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- Ionic CLI (`npm install -g @ionic/cli`)

## ⚙️ Environment Setup

1. **Copy the example environment file:**
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.example.ts src/environments/environment.prod.ts
   ```

2. **Configure your AWS Cognito credentials** in both files:
   ```typescript
   export const environment = {
     production: false, // Set to true in environment.prod.ts
     apiUrl: 'https://your-api-gateway-url.execute-api.your-region.amazonaws.com/dev',
     cognito: {
       userPoolId: 'your-region_YourPoolId',
       userPoolWebClientId: 'your-client-id-here',
       region: 'your-region',
       domain: 'your-cognito-domain.auth.your-region.amazoncognito.com',
       clientId: 'your-client-id-here'
     }
   };
   ```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pennytrack-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment files** (see Environment Setup above)

## 💻 Development

### Run the development server
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload when you make changes.

### Run on mobile device (using Capacitor)
```bash
# iOS
ionic capacitor run ios

# Android
ionic capacitor run android
```

## 🏗️ Build

### Build for production
```bash
npm run build
```

Build artifacts will be stored in the `www/` directory.

### Build for specific platform
```bash
# Build and sync with Capacitor
ionic capacitor build ios
ionic capacitor build android
```

## 🧪 Testing

### Run unit tests
```bash
npm test
```

### Run tests with coverage
```bash
ng test --code-coverage
```

## 🏛️ Architecture Overview

### Authentication Flow
- Uses AWS Cognito with OAuth 2.0 PKCE (Proof Key for Code Exchange) for secure authentication
- `AuthService` manages the authentication flow and token storage
- `AuthInterceptor` automatically adds Bearer tokens to all HTTP requests
- `AuthGuard` protects routes from unauthorized access

### Multi-Tenant Architecture
- Group-based data segregation using `X-Group-Id` header
- Users can belong to multiple groups
- Default group is set during authentication
- All API requests include the current group context

### Key Services

- **AuthService** (`src/app/services/auth.service.ts`)
  - Handles Cognito OAuth flow with PKCE
  - Manages login, logout, and callback handling
  - Stores authentication tokens in localStorage

- **TransactionService** (`src/app/services/transaction.service.ts`)
  - CRUD operations for financial transactions
  - Automatically includes group context in requests

- **CustomFieldsService** (`src/app/services/custom-fields.service.ts`)
  - Manages custom accounts, categories, and responsible parties
  - Group-specific custom field management

- **GroupService** (`src/app/services/group.service.ts`)
  - Retrieves user groups
  - Manages default group selection

### Routing Structure
- **Public Routes**: `/login`, `/callback`
- **Protected Routes** (requires authentication):
  - `/tabs/home` - Dashboard
  - `/tabs/transactions` - Transaction list and management
  - `/tabs/profile` - User profile and settings
    - `/tabs/profile/groups` - Group management
    - `/tabs/profile/custom-fields` - Custom field configuration

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── header/         # App header component
│   │   └── picker-select/  # Custom select picker
│   ├── guards/             # Route guards
│   │   └── auth.guard.ts   # Authentication guard
│   ├── interceptors/       # HTTP interceptors
│   │   └── auth.interceptor.ts
│   ├── pages/              # Application pages
│   │   ├── login/         # Login page
│   │   ├── callback/      # OAuth callback handler
│   │   ├── tabs/          # Tab navigation container
│   │   ├── transactions/  # Transaction management
│   │   └── profile/       # User profile & settings
│   └── services/          # Application services
├── assets/                # Static assets
├── environments/          # Environment configurations
└── theme/                # Global styles and themes
```

## 🔒 Security Notes

- Environment files with real credentials are **gitignored**
- Use `environment.example.ts` as a template
- Never commit actual AWS credentials to version control
- Cognito Client IDs are public (OAuth PKCE flow) but environment-specific
- All API requests are authenticated with Bearer tokens
- Group-based access control ensures data isolation

## 📱 Features in Detail

### Transaction Management
- Create income and expense transactions
- Attach to custom accounts and categories
- Assign responsible parties
- Filter by date range, account, category, or responsible party
- Edit and delete existing transactions

### Custom Fields
- Create custom accounts (e.g., Bank accounts, Credit cards)
- Define custom categories (e.g., Food, Transport, Entertainment)
- Set up responsible parties for expense tracking
- All custom fields are group-specific

### Group Management
- Users can belong to multiple groups (e.g., Personal, Family, Business)
- Switch between groups to access different transaction sets
- Each group has isolated data and custom fields

## 🤝 Contributing

This is a portfolio project. If you'd like to use it as a base for your own project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- Portfolio: [your-portfolio-url]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [your-linkedin](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Built with [Angular](https://angular.io/)
- UI powered by [Ionic Framework](https://ionicframework.com/)
- Icons by [Ionicons](https://ionic.io/ionicons)
- Authentication by [AWS Cognito](https://aws.amazon.com/cognito/)

---

**Note**: This is a portfolio project demonstrating modern web and mobile development practices with Angular, Ionic, and AWS services.
