# VRV - Role-Based Authentication System

## Overview
A secure web application demonstrating role-based authentication and authorization. Features multiple user roles with different access levels and secure user management.
I have used best security practices for this application like hashing passwords, using JWT for authentication and authorization, and using best practices for routing and middleware.

## Note
- In this system the user can only register as a regular user. Admin/Moderator roles can only be assigned by existing admins.
so here are admin and moderator credentials:

# Admin Credentials
ADMIN_EMAIL=admin1234@gmail.com
ADMIN_USERNAME=admin_1234
ADMIN_PASSWORD="admin@123#4"

# Moderator Credentials
MODERATOR_EMAIL=moderator@gmail.com
MODERATOR_USERNAME=moderator
MODERATOR_PASSWORD=moderator@123

## Access Levels

### 1. Admin
- User management dashboard
- Role assignment capabilities
- Real-time user statistics
- Can promote users to moderator/admin

### 2. Moderator
- Access to moderator dashboard
- Cannot modify user roles

### 3. User
- Basic access
- Cannot access admin/moderator features

## Default Credentials
> ⚠️ **Important**: Users can only register as regular users. Admin/Moderator roles can only be assigned by existing admins.

