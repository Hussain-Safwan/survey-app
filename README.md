# Survey App
### About the app
This is an online survey app that both allows users to present their valuable thoughts and facilitates admins to build a survey from the scratch. The survey includes three categories of queries, viz. **input boxes** for open-ended questions, **radio buttons** for decisive ones and **checkboxes** for queries demanding multiple answers to be taken. This is an app built on **MERN** stack and hence requires **Node.js** and **npm** be pre-installed in the system. 

### Download and installation
Follow the following steps to download the project and install the required dependencies,
1. ```npm i```
2. ```npm i --prefix client```
3. ```npm run dev```

The final command should automatically open the user interface on http://localhost:3000

### Using the app
The app usage can be partitioned into two distinct sections, 

#### General User
This is the user expected to take the surveys. The first page lists the surveys available to be taken in a grid layout. The user is required to click on the desired one to view the questions. The user may answer a particular query or leave it unanswered and seek the next one, **except for the radio buttoned ones**. Once a single choice intended radio buttoned query appears, the **next button** is virtually disabled and is unabled only after any option is selected. This is done because these are the answers based on which the remaining survey is personalized (or ended right away if deemed perfect). The **submit button** appears once the user reaches the end of their session and upon being clicked, the survey is recorded. Note that this is an anynomous survey and each submission is recorded against unique id.

#### Admin
This is the kind of user intended to set the questions and review the submissions. The admin panel can be reached via this url http://localhost:3000/admin . The interface has a similar layout as that of the general user except for clicking on any particular survey reveals the responses it received, listed against the user id. The details of how each user answered a survey are hidden by default and displayed once clicked. This may gain be collapsed by re-clicking. To create a new survey the **Create Survey** on top of the standard admin page is to be clicked.

### Creating Surveys
Once on the create-survey interface, the following points are to be followed,
1. The first input box is for the title of the survey. It is best to keep the length of the title as short as possible.
2. Within the question section, there is one input box for the first question, the question is to be typed inside. Then there is a select box for the type response to expect. The select box has the following options, 
* **Free:** Indicating an open-ended answer is expected. This will add an input box to the compiled survey.
* **SCQ:** Indicating a single answer expecting set of radio buttons will be added. An **add button** will appear clicking which will allow the admin to add the options as needed. Below the option input box are two additional input boxes and a checkbox labeled **over**. The additional input boxes are there to record the next question to present to the user should an option be selected. For example, we would ask a person about the number of children they have only if the selected the married option in the preceding question. So the additional input boxes under the married option will hold the index number of the question about the children and where to end the survey respectively. The checkbox represents the end of the survey should it be ticked. For example, we're only interested in the people who've graduated - we want the checkbox to be ticked should a person chooses any options other than graduated. If the checkbox is ticked, the contents of the additional input boxes will be ignored and hence may be left empty. Note that the additional input boxes strictly support integer values.
*  **MCQ:** Indicating more than one options may apply. Click the add buttons to include the options as needed.
3. Once the form is filled up, admin is required to click the submit button to upload the survey. A message pops up after a successfull submission is made.

### Cautions
There are a few things needed to be taken great care of, 
1. Much attention has not been paid in making the interface responsive - so though not expected but still the app interface may not be compatible for some devices.
2. The app is not very robust - so any unexpected behaiviour may cause it to crash, one such instances being leaving any field empty in the create-survey form. Please do not leave any field (except those mentioned earlier) empty in the create-survey form.
3. There are no in-app functionalities available to reach the admin panel, so it must be reached via manually typing the url or clicking over here http://localhost:3000/admin .
