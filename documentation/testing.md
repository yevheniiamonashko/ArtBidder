# Testing

**Notes:** As I am using json files to store data, automated tests for bid placing could fail, if before performing the automated testing, the initial data would be changed by browser interactions.
Before performing artist, bid and painting tests, please run the [login tests](../tests/rest/loginTests.http) first.

## Traceability matrix

### Functional

| Test | F1 | F2 | F3 | F4 | F5 | F6 | F7 | F8 | F9 | F10 |
|:----:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:---:|
| TC1  | X  |    |    |    |    |    |    |    |    |     |
| TC2  |    |    |    |    |    |    | X  |    |    |     |
| TC3  |    |    |    |    |    |    | X  |    |    |     |
| TC4  |    |    |    |    |    |    | X  |    |    |     |
| TC5  |    |    | X  |    |    |    | X  |    |    |     |
| TC6  |    |    |    |    |    |    | X  |    |    |     |
| TC7  |    |    | X  |    |    |    | X  |    |    |     |
| TC8  |    |    |    |    |    |    | X  |    |    |     |
| TC9  |    | X  |    |    |    |    |    |    |    |     |
| TC10 |    | X  |    |    |    |    |    |    |    |     |
| TC11 |    | X  |    |    |    |    |    |    |    |     |
| TC12 |    | X  |    |    |    |    |    |    |    |     |
| TC15 |    |    |    |    |    | X  |    |    |    |     |
| TC17 |    |    |    |    |    | X  |    |    |    |     |
| TC18 |    |    |    |    |    | X  |    |    |    |     |
| TC19 |    |    |    |    |    |    | X  |    |    |  X  |
| TC20 |    |    |    |    |    | X  |    |    |    |  X  |
| TC21 |    |    |    |    |    | X  |    |    |    |  X  |
| TC22 |    |    |    |    |    | X  |    |    |    |  X  |
| TC23 |    |    |    |    |    |    |    |    |    |  X  |
| TC25 |    |    |    |    |    | X  |    |    |    |  X  |
| TC26 |    |    |    |    |    |    |    |    |    |  X  |
| TC27 |    |    |    |    |    |    |    |    |    |  X  |
| TC28 |    |    |    |    |    |    |    |    |    |  X  |
| TC29 |    |    |    |    |    |    |    |    |    |  X  |
| TC30 |    |    |    |    |    |    |    |    |    |  X  |
| TC31 |    |    |    |    |    |    |    |    |    |  X  |
| TC54 |    |    |    |    |    | X  |    |    | X  |     |
| TC55 |    |    |    |    |    | X  |    |    |    |     |
| TC56 |    |    |    |    |    | X  |    |    |    |     |
| TC57 |    |    |    |    |    | X  |    |    |    |     |
| TC58 |    |    |    |    |    | X  |    |    |    |     |
| TC59 |    |    |    |    |    | X  |    |    |    |     |
| TC60 |    |    |    |    |    |    |    |    | X  |     |
| TC64 |    |    |    |    |    | X  |    |    |    |     |
| TC65 |    |    |    |    |    | X  |    |    |    |     |
| TC66 |    |    |    |    |    | X  |    |    |    |     |
| TC67 |    |    |    |    |    | X  |    |    |    |     |
| TC68 |    |    |    |    |    | X  |    |    |    |     |
| TC39 |    |    |    |    |    | X  |    |    |    |     |

Automated testing do not cover the F5, but it could be visible through automated testing.
As there is no endpoints for modifying the bids, and only endpoints for creating and displaying it, the test do not
cover F4, as these operations aren't available to the user.

### Non-Functional

### Non-Functional

| Test | NF1 | NF2 | NF3 | NF4 | NF5 | NF6 | NF7 | NF8 | NF9 | NF10 | NF11 | NF12 | NF13 | NF14 | NF15 | NF16 | NF17 | NF18 | NF19 |
|:----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
| TC1  |  X  |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC2  |  X  |  X  |     |     |  X  |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC3  |  X  |  X  |     |     |  X  |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC4  |     |  X  |     |     |  X  |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC5  |     |  X  |     |     |  X  |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC6  |  X  |  X  |     |     |  X  |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC7  |     |  X  |     |     |  X  |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC8  |     |  X  |     |     |  X  |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC13 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |  X   |      |      |  X   |
| TC14 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |  X   |      |      |  X   |
| TC15 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC16 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC17 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC18 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC19 |  X  |  X  |     |  X  |     |     |     |     |     |      |      |      |  X   |      |      |      |      |      |      |
| TC20 |     |  X  |     |  X  |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC21 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC22 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC23 |  X  |  X  |     |  X  |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC25 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC26 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC27 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC28 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC29 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC30 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC31 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC32 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC33 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC34 |     |  X  |     |  X  |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC35 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC36 |     |  X  |     |  X  |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC37 |     |  X  |     |  X  |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC38 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC39 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC40 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC41 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC42 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC50 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC51 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC52 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC53 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC54 |  X  |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC55 |  X  |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC56 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC57 |  X  |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC58 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC59 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC60 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC61 |     |  X  |     |  X  |     |     |     |     |     |      |      |  X   |      |      |      |  X   |      |      |      |
| TC62 |     |  X  |     |  X  |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC63 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC64 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC65 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC66 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC67 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC68 |  X  |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC69 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC70 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
| TC71 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC72 |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| TC73 |     |  X  |     |  X  |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |

## Test plan

##### User Management:

- Register new users.
- Duplicate registration attempt.
- Login with valid credentials.
- Login with invalid credentials.
- Registration with invalid data.
- Editing existing logged in user.
- Editing non-existing user.
- Edit user without a token.
- Delete existing user being authenticated.
- Attempt to delete a user without token.

##### Painting Management and Viewing:

- Add new painting with admin credentials.
- Update existing painting with admin credentials.
- Delete painting with admin credentials.
- Fetch all painting.
- Fetch painting by ID.
- Attempt to add new painting with absent token.
- Attempt to update new painting with absent token.
- Attempt to delete new painting with absent token.
- Attempt to add new painting with regular user token.
- Attempt to update new painting with regular user token.
- Attempt to delete new painting with regular user token.
- Attempt to add and Update painting with invalid data.

##### Artist Management and Viewing:

- Add new artist with admin credentials.
- Update existing artist with admin credentials.
- Delete artist with admin credentials.
- Fetch all artists.
- Fetch artist by ID.
- Attempt to add new artist with absent token.
- Attempt to update new artist with absent token.
- Attempt to delete new artist with absent token.
- Attempt to add new artist with regular user token.
- Attempt to update new artist with regular user token.
- Attempt to delete new artist with regular user token.
- Attempt to add and Update artist with invalid data.

##### Bidding System:

- Place a bid on a painting being authorized.
- Attempt to place a bid without authentication.
- Attempt to place invalid bid.
- Retrieve bids for a specific painting.
- Attempt to retrieve bids for non-existent painting.
- Retrieve users winning bids.
- 

**Testing Tools:** 

- Automated REST Client http tests.
- Chrome(UI Testing).

## Test report

| Test Case ID | Description                                             | Result  |
|--------------|---------------------------------------------------------|---------|
| TC1          | Tests if list of paintings is returned correctly        | Passed  |
| TC2          | Tests if correct paintings filtered by existing author  | Passed  |
| TC3          | Tests if correct painting filtered by existing style    | Passed  |
| TC4          | Tests if correct painting filtered by existing material | Passed  |
| TC5          | Tests if correct painting searched by existing title    | Passed  |
| TC6          | Tests if correct painting returned with combined filters| Passed  |
| TC7          | Tests if searching for a non-existent title             | Passed  |
| TC8          | Tests if filtering by non-existent combination          | Passed  |
| TC9          | Tests retrieving a painting by valid ID                 | Passed  |
| TC10         | Tests retrieving a painting by non-existent ID          | Passed  |
| TC11         | Tests retrieving bids for a valid painting ID           | Passed  |
| TC12         | Tests retrieving bids for an invalid painting ID        | Passed  |
| TC13         | Tests login for admin user                              | Passed  |
| TC14         | Tests login for regular user                            | Passed  |
| TC15         | Tests login for admin user with wrong password          | Passed  |
| TC16         | Tests login for non-existent user                       | Passed  |
| TC17         | Tests login with missing password                       | Passed  |
| TC18         | Tests login with missing email                          | Passed  |
| TC19         | Tests adding valid painting                             | Passed  |
| TC20         | Tests updating existing painting                        | Passed  |
| TC21         | Tests updating painting with invalid date range         | Passed  |
| TC22         | Tests updating painting with invalid start price        | Passed  |
| TC23         | Tests deleting existing painting                        | Passed  |
| TC25         | Tests creating painting without a token                 | Passed  |
| TC26         | Tests creating painting with regular user token         | Passed  |
| TC27         | Tests updating painting without a token                 | Passed  |
| TC28         | Tests updating painting with regular user token         | Passed  |
| TC29         | Tests updating non-existent painting                    | Passed  |
| TC30         | Tests deleting painting without a token                 | Passed  |
| TC31         | Tests deleting painting with regular user token         | Passed  |
| TC32         | Tests deleting non-existent painting                    | Passed  |
| TC33         | Tests if list of artists is returned correctly          | Passed  |
| TC34         | Tests adding a valid artist                             | Passed  |
| TC35         | Tests retrieving artist by valid ID                     | Passed  |
| TC36         | Tests updating a valid artist                           | Passed  |
| TC37         | Tests deleting a valid artist                           | Passed  |
| TC38         | Tests retrieving artist by invalid ID                   | Passed  |
| TC39         | Tests adding an invalid artist                          | Passed  |
| TC40         | Tests deleting non-existent artist                      | Passed  |
| TC41         | Tests adding artist with missing token                  | Passed  |
| TC42         | Tests adding artist with non-admin token                | Passed  |
| TC50         | Tests updating artist with missing token                | Passed  |
| TC51         | Tests updating artist with non-admin token              | Passed  |
| TC52         | Tests deleting artist with missing token                | Passed  |
| TC53         | Tests deleting artist with non-admin token              | Passed  |
| TC54         | Tests creating a valid bid                              | Passed  |
| TC55         | Tests creating bid with missing data                    | Passed  |
| TC56         | Tests creating bid for auction that didn't start        | Passed  |
| TC57         | Tests creating bid for auction that ended               | Passed  |
| TC58         | Tests creating bid with amount less than start price    | Passed  |
| TC59         | Tests creating bid with amount less than current bid    | Passed  |
| TC60         | Tests creating bid with absent token                    | Passed  |
| TC61         | Tests creating a valid user                             | Passed  |
| TC62         | Tests updating existent user                            | Passed  |
| TC63         | Tests retrieving bids history for valid user            | Passed  |
| TC64         | Tests updating user with invalid email                  | Passed  |
| TC65         | Tests creating user with missing data                   | Passed  |
| TC66         | Tests creating user with invalid email                  | Passed  |
| TC67         | Tests creating user with short password                 | Passed  |
| TC68         | Tests creating duplicate user                           | Passed  |
| TC69         | Tests updating non-existent user                        | Passed  |
| TC70         | Tests deleting non-existent user                        | Passed  |
| TC71         | Tests editing user without a user token                 | Passed  |
| TC72         | Tests deleting user without a token                     | Passed  |
| TC73         | Tests deleting user                                     | Passed  |

