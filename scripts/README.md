# Scripts

## Admin user

**admin-user.json** – Template for MongoDB import. The password is a placeholder.

**Before importing:** Run `npm run write:admin-json` to generate a valid file with a bcrypt-hashed password.

```bash
npm run write:admin-json
mongoimport --uri="YOUR_MONGODB_URI" --db=kucha-enterprises --collection=users --file=scripts/admin-user.json
```

**Or** use `npm run create:admin` to create the admin user directly in MongoDB (no import needed).
