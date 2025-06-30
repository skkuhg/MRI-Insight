# Security Notice

## API Key Protection

This project uses the Tavily AI API for medical literature search and analysis. To protect your API key:

### ✅ Security Best Practices

1. **Never commit your `.env.local` file** - It's already included in `.gitignore`
2. **Use environment variables** - Store your API key in `.env.local`
3. **Keep your API key private** - Don't share it in issues, pull requests, or documentation
4. **Rotate your key** if you suspect it's been compromised

### 🔒 Environment Setup

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Add your real API key to `.env.local`:
   ```
   TAVILY_API_KEY=your_actual_api_key_here
   ```

### 🚨 If Your Key is Compromised

1. Immediately revoke the compromised key at [Tavily Dashboard](https://app.tavily.com)
2. Generate a new API key
3. Update your `.env.local` file with the new key
4. Check git history to ensure no keys were committed

### 📝 For Contributors

- Never include real API keys in examples
- Always use placeholder values like `your_api_key_here`
- Test with your own API key in your local `.env.local` file

## Reporting Security Issues

If you discover a security vulnerability, please report it privately to the repository maintainer.