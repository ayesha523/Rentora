# Rentora
A web-based apartment management system for managers and tenants.
## Application Flow Diagram

The following diagram shows the planned navigation, user roles, pages, and major features of the Rentora Apartment Management System.

![Rentora Application Flow Diagram](docs/rentora-application-flow.png)

### Editable Source

The Mermaid source file is available here:

[`docs/rentora-application-flow.mmd`](docs/rentora-application-flow.mmd)

# Backend Setup

## Laravel Installation

The backend is built using Laravel and is located inside the `backend` folder.

### Requirements

- PHP 8.2+
- Composer
- MySQL

### Setup Instructions

Navigate to the backend folder:

```bash
cd backend

# Database Structure

## Entities

* Users
* Roles
* Apartments
* Flats
* Tenants
* Rent Payments
* Utility Bills
* Complaints
* Notices
* Maintenance Requests

## Relationships

* One Role has many Users
* One User belongs to one Role
* One Apartment has many Flats
* One Flat belongs to one Apartment
* One Flat may be assigned to one Tenant
* One Tenant belongs to one Flat
* One Tenant has many Rent Payments
* One Tenant has many Utility Bills
* One Tenant has many Complaints
* One Complaint has many Maintenance Requests
* One Manager can publish many Notices
* One Notice belongs to one User (Manager)

---

# API Route Plan

## Authentication

| Method | Route         |
| ------ | ------------- |
| POST   | /api/register |
| POST   | /api/login    |
| POST   | /api/logout   |
| GET    | /api/profile  |

## Apartments

| Method | Route                |
| ------ | -------------------- |
| GET    | /api/apartments      |
| POST   | /api/apartments      |
| GET    | /api/apartments/{id} |
| PUT    | /api/apartments/{id} |
| DELETE | /api/apartments/{id} |

## Flats

| Method | Route           |
| ------ | --------------- |
| GET    | /api/flats      |
| POST   | /api/flats      |
| GET    | /api/flats/{id} |
| PUT    | /api/flats/{id} |
| DELETE | /api/flats/{id} |

## Tenants

| Method | Route             |
| ------ | ----------------- |
| GET    | /api/tenants      |
| POST   | /api/tenants      |
| GET    | /api/tenants/{id} |
| PUT    | /api/tenants/{id} |
| DELETE | /api/tenants/{id} |

## Rent Payments

| Method | Route                   |
| ------ | ----------------------- |
| GET    | /api/rent-payments      |
| POST   | /api/rent-payments      |
| GET    | /api/rent-payments/{id} |
| PUT    | /api/rent-payments/{id} |
| DELETE | /api/rent-payments/{id} |

## Utility Bills

| Method | Route                   |
| ------ | ----------------------- |
| GET    | /api/utility-bills      |
| POST   | /api/utility-bills      |
| GET    | /api/utility-bills/{id} |
| PUT    | /api/utility-bills/{id} |
| DELETE | /api/utility-bills/{id} |

## Complaints

| Method | Route                |
| ------ | -------------------- |
| GET    | /api/complaints      |
| POST   | /api/complaints      |
| GET    | /api/complaints/{id} |
| PUT    | /api/complaints/{id} |
| DELETE | /api/complaints/{id} |

## Maintenance Requests

| Method | Route                          |
| ------ | ------------------------------ |
| GET    | /api/maintenance-requests      |
| POST   | /api/maintenance-requests      |
| GET    | /api/maintenance-requests/{id} |
| PUT    | /api/maintenance-requests/{id} |
| DELETE | /api/maintenance-requests/{id} |

## Notices

| Method | Route             |
| ------ | ----------------- |
| GET    | /api/notices      |
| POST   | /api/notices      |
| GET    | /api/notices/{id} |
| PUT    | /api/notices/{id} |
| DELETE | /api/notices/{id} |

## Dashboard Statistics

| Method | Route                |
| ------ | -------------------- |
| GET    | /api/dashboard/stats |

---

# Migration Status

The following Laravel migrations have been prepared:

* create_roles_table
* create_users_table
* create_apartments_table
* create_flats_table
* create_tenants_table
* create_rent_payments_table
* create_utility_bills_table
* create_complaints_table
* create_maintenance_requests_table
* create_notices_table

All migrations run successfully using:

```bash
php artisan migrate:fresh
```
