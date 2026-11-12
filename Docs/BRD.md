Business Requirements Document (BRD)
Community Sports Auction Manager
Version: 1.0

1. Project Overview
Product Name
Community Sports Auction Manager

Purpose
Community Sports Auction Manager is a web-based application designed to help apartment communities, gated societies, and local sports clubs conduct organized player auctions.

The application eliminates spreadsheet-based auction management by providing a centralized platform to manage tournaments, teams, players, live bidding, purse tracking, and reporting.

Primary sport supported in MVP:

Cricket
Future support:

Football
Volleyball
Basketball
Badminton
Tennis
2. Business Objectives
The system should allow organizers to:

Create tournaments
Manage teams
Import players
Configure auction order
Run live auctions
Track team purses automatically
Eliminate manual calculations
Generate reports
Export auction results
Success Criteria:

Configure tournament within 15 minutes
Import 100+ players
Conduct a complete live auction
Prevent invalid bids
Generate final team reports
3. Community Structure
A Community contains many Tournaments.

Example:

Green Meadows Apartment

Tournaments:

Summer Premier League 2027
Monsoon Cup 2027
Pongal Trophy 2028
Every tournament maintains separate:

Teams
Players
Purse balances
Auction queues
Reports
4. User Roles
Owner / Admin
Permissions:

Full access
Community settings
Tournament management
Team management
Player management
Auction management
Reports
Auction Operator
Permissions:

Run live auctions
Record bids
Sell players
Mark players unsold
Undo actions
Cannot:

Modify community settings
Viewer
Permissions:

View teams
View auction progress
View reports
Cannot modify data.

5. Tournament Management
Create Tournament
Fields:

Tournament Name
Sport
Number Of Teams
Players Per Team
Starting Purse
Base Price
Bid Increment
Auction Date
Tournament Status:

Draft
Ready
Auction In Progress
Completed
Archived
6. Team Management
Fields
Team Name
Owner Name
Captain Name
Team Logo
Team Color
Financial Information:

Initial Purse
Remaining Purse
Total Spend
Team Detail View
Display:

Team Information
Purchased Players
Total Spend
Remaining Purse
Squad Composition:

Batsmen
Bowlers
All Rounders
Wicket Keepers
7. Player Management
Player Fields
Full Name
Mobile Number
Age
Profile Photo
Role
Batting Style
Bowling Style
Experience
Role Options:

Batsman
Bowler
All Rounder
Wicket Keeper
Optional Statistics:

Matches Played
Runs
Wickets
Catches
Financial:

Base Price
Player Status:

Available
Queued
Live
Sold
Unsold
8. Excel Import
Supported Formats:

XLSX
CSV
Player Import Fields:

Name
Age
Role
Batting Style
Bowling Style
Base Price
Validation Rules:

Name required
Valid role required
Base price required
Duplicate players flagged
Import Summary:

Records Found
Valid Records
Errors
9. Auction Queue
Purpose:

Determine auction order.

Features:

Drag and drop ordering
Shuffle queue
Move up
Move down
Reset queue
Display:

Position
Player Name
Role
10. Live Auction Room
Primary operational screen.

Layout
Left Panel
Current Player

Display:

Photo
Name
Role
Batting Style
Bowling Style
Experience
Base Price
Upcoming Players Queue

Center Panel
Current Bid

Display:

Current Bid
Leading Team
Bid Count
Auction Timer

Display only.

Controls:

Start
Pause
Reset
Team Bidding Controls
Operator updates bid by clicking team buttons.

Example:

Thunder Kings
Titans
Warriors
Strikers
When clicked:

Bid increases
Team becomes leader
History updates
Bid Increment Options:

500
1000
2000
Custom Bid:

Supported.

Bid History
Display chronological bidding history.

Example:

₹6000 Thunder Kings

₹6500 Titans

₹7000 Warriors

Right Panel
Team Purse Tracker

Display:

Team Name
Remaining Purse
Players Purchased
Maximum Possible Bid
Color Coding:

Green
Yellow
Red
11. Auction Actions
SOLD
System:

Assign player to team
Deduct purse
Update reports
Mark sold
UNSOLD
System:

Mark player unsold
REOPEN
System:

Reopen player for auction
UNDO
System:

Restore:

Player status
Team assignment
Purse balances
Bid history
NEXT PLAYER
System:

Opens next player in queue
Condition:

No current player can remain active.

12. Business Rules
Rule 1
Player belongs to only one team.

Rule 2
A bid cannot exceed a team's remaining purse.

Rule 3
One player can be live at any given time.

Rule 4
Sold player removes purse immediately.

Rule 5
Undo must restore all affected records.

Rule 6
Tournament data is isolated from other tournaments.

13. Reports
Auction Summary
Display:

Total Players
Sold Players
Unsold Players
Total Auction Value
Highest Bid
Average Sale Price
Team Reports
Display:

Players Purchased
Total Spend
Purse Remaining
Charts
Team Spending
Remaining Purse
Role Distribution
Auction Progress
Export Options
Excel
CSV
PDF
14. Projector Mode
Purpose:

Large-screen display for audience.

Display:

Player Photo
Player Name
Current Bid
Leading Team
Auction Timer
Recent Sales
No editing controls.

15. Settings
Community Settings:

Community Name
Community Logo
Theme Color
Auction Defaults:

Default Purse
Base Price
Bid Increment
Timer
Theme Options:

Light Mode
Dark Mode
System Mode
16. MVP Acceptance Criteria
The application is considered complete when an organizer can:

✅ Create a community

✅ Create a tournament

✅ Create teams

✅ Import players

✅ Configure auction queue

✅ Start live auction

✅ Bid using team buttons

✅ Track purses automatically

✅ Mark players sold

✅ Undo mistakes

✅ Generate reports

✅ Export results

✅ Switch between light and dark theme

✅ Run a complete apartment cricket auction without spreadsheets