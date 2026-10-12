# BankFlow - Banking Dashboard

## About the Project

BankFlow is a simple banking dashboard made using Next.js, React, TypeScript and Tailwind CSS. I made this project to practice frontend development and understand how a banking dashboard works.

Users can log in with a demo login, check their accounts and balances, view transactions, filter transaction history and transfer money between their accounts.

This is only a demo project. No real money is transferred.

## Features

- Demo login and logout
- Dashboard showing total balance, accounts, income and expenses
- View different bank accounts and their balances
- View transactions for a selected account
- Search transactions by description
- Filter transactions by type and status
- Sort transactions by date or amount
- Pagination for transaction history
- Transfer money between accounts
- Review, confirm or cancel a transfer
- Validation for invalid amounts and insufficient balance
- Responsive design for different screen sizes

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

## How to Run the Project

First, clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Go to the project folder:

```bash
cd <YOUR_PROJECT_FOLDER>
```

Install the required packages:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

To check the production build, run:

```bash
npm run build
```

## Project Structure

- `app/` contains the pages of the application.
- `components/BankProvider.tsx` manages shared account and transaction data.
- `components/Navigation.tsx` contains the navigation bar and logout button.
- `components/Protected.tsx` checks the demo login status before showing protected pages.
- `lib/seed.ts` contains the initial account and transaction data.
- `types/bank.ts` contains the TypeScript types used in the project.

## State Management

I used React Context and `useState` to manage the account and transaction data in `BankProvider.tsx`.

Other pages access this data using the `useBank()` hook. When a transfer is successful, the sender's balance decreases, the receiver's balance increases, and two transaction records are added.

Since the pages use the same provider, the updated data is reflected on the dashboard, accounts page and transaction history without creating separate copies of the data.

## Transfer Validation

Before completing a transfer, the application checks that:

- The source and destination accounts are different.
- The amount is greater than zero.
- The amount is a valid number.
- The source account has enough balance.

The user can review the transfer before confirming it. If the transfer is cancelled or validation fails, the balances should remain unchanged.

After a successful transfer, the sender gets a debit transaction and the receiver gets a credit transaction.

## Testing

I can test the transfer feature using these cases:

1. Select the same account for both source and destination.
2. Enter zero or a negative amount.
3. Enter an amount greater than the available balance.
4. Review a transfer and cancel it.
5. Confirm a valid transfer and check both account balances.
6. Check whether the new transactions appear in the transaction history.

These are manual test cases. The results should be checked by running the application.

## Assumptions and Limitations

- All account and transaction data is fictional.
- The login system is only for demonstration and is not real authentication.
- Account and transaction data is stored in React state.
- Data can reset to the initial values after refreshing the application.
- Transfers are simulated and no real money moves.
- The project does not use a real backend or database.
- Production-level security and simultaneous transfer handling are not implemented.




