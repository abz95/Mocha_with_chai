# Mocha with Chai
This project is developed in Javascript - Mocha framework with Chai assertions. Please note that there might be some structural issues in the project, as this is my first attempt at creating an automation framework using these technologies, except Javascript. I will be adding comments to the code and pushing them for better readability,  and I write comments while coding that are specifically easy for me, and polishing them later.


## Setup and Execution
To run the project, use the following command in the terminal (root directory of project):
```shell
mocha ./tests
```


## Reporting

The project utilizes "mochaawesome" report for reporting. The report is generated in the root folder of this project when the suite is run. Please note that I've added my report to `.gitignore` as to prevent unnecessary repository clutter.



## Issues Faced
The provided stack "API Gateway REST API with Lambda authorizer" wasn't able to be deployed due to an error regarding nodejs 14 being depreciated on aws, I tried multiple thing to make it work but it just didn't go through. I have also created a PR for updating that on the provided Github project, but it is yet to be approved and merged by the moderators. So, for that project I have made a local express server and tried to replicate the scenario and prepared the test cases as best as I could.
