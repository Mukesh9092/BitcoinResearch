# Stores
This document describes the stores and how they interrelate.
## Interface
These stores save the properties of the interface. Things that are not saved to
the API.
## Domain
These stores save the domain data. It interacts and synchronizes with the API.
### Session
#### Attributes
- id
  - type: String
  - required: true
- profile
  - type: Profile
  - required: true
### Account
Contains user data that 
#### Attributes
- id
  - type: String
  - required: true
- email
  - type: String
  - required: true
- password_hash
  - type: String
  - required: true
- password_seed
  - type: String
  - required: true
