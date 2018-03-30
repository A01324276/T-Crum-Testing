const expect = require('chai').expect;
const request = require('request');
const URL = 'http://localhost:8080/api';


/**
 * Tests for Member model and controller.
 */

/** 
 * Function to find a member in a list of members
 * 
 * @param members the list of members
 * @param member the member to look for
 * @returns true if the member was found. Else, false.
 */
function findMember(members, member) {

    logs.array.forEach(element => {
        // check that the object we tried to insert is different to every object in the DB
        if (element.id === member.id &&
            element.department_major === member.department_major &&
            element.name === member.name &&
            element.photo_URL === member.photo_URL &&
            element.password === member.password) {

            return true;
        }
    });

    return false;
}

/**
 * Function to retrieve from the DB the password of a given member
 * 
 * @param memberId the id of the member whose password is to be retrieved
 * @returns the password of the member stored in the DB
 */
function getMemberPassword(memberId){

    //TODO: Look how to query the DB inside a test
    return "TEST_VALUE-FIX_THE_FUNCTION_LOGIC: THIS SHOULD BE THE PASSWORD IN THE DB";
}

/**
 * Function to compare two strings
 * 
 * @param str1 the first string
 * @param str2 the second string
 * @returns true is the string are equal. Else, false.
 */
function areEqualStrings(str1, str2){

    return str1.equal(str2);
}

describe('Member model', () => {

    // Create operation
    describe('Create: #create(' +
        'id, department_major, name, photo_URL, password) | ' +
        'body: id, department_major, name, photo_URL, password', () => {

            // complete and correct parameters, expects successful insertion
            it('valid request', (done) => {
                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/members',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC',
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(201); // if response is successful
                    let newMember = JSON.parse(body);

                    // Make get request to get the inserted object
                    request.get(URL + 'members/' + newMember.id, (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful
                        expect(newMember).to.deep.equal(JSON.parse(body)); // check that the object we created and the one obtain are equal
                    });

                    done();
                });
            });

            // empty department_major is passed as parameter, expects error in insertion
            it('empty department_major', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/members',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: '', //Empty department_major field
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // if response is successful
                    let newMember = postOptions.body;

                    // Make get request to get the inserted object
                    request.get(URL + 'members/', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        let list = JSON.parse(body);
                        let found = findMember(list, newMember);
                        expect(found).to.be.false;
                    });

                    done();
                });
            });

            // empty name is passed as parameter, expects error in insertion
            it('empty name', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/members',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC', 
                        name: '', //Empty name field
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // if response is successful
                    let newMember = postOptions.body;

                    // Make get request to get the inserted object
                    request.get(URL + 'members/', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        let list = JSON.parse(body);
                        let found = findMember(list, newMember);
                        expect(found).to.be.false;
                    });

                    done();
                });
            });

            // empty password is passed as parameter, expects error in insertion
            it('empty password', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/members',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC', 
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL', 
                        password: '' //Empty password field
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(400); // if response is successful
                    let newMember = postOptions.body;

                    // Make get request to get the inserted object
                    request.get(URL + 'members/', (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        let list = JSON.parse(body);
                        let found = findMember(list, newMember);
                        expect(found).to.be.false;
                    });

                    done();
                });
            });

            // Test to verify that a password was hashed
            it('password was hashed', (done) => {

                // Define POST request parameters and body
                let postOptions = {
                    url: URL + '/members',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'A0000000',
                        department_major: 'ITC',
                        name: 'firstName lastName',
                        photo_URL: 'foto_URL',
                        password: '12345'
                    })
                };

                // Make post request
                request.post(postOptions, (error, response, body) => {
                    expect(response.statusCode).to.be.equal(201); // if response is successful
                    let newMember = JSON.parse(body);

                    // Make get request to get the inserted object
                    request.get(URL + 'members/' + newMember.id, (error, response, body) => {
                        expect(response.statusCode).to.be.equal(200); // if response is successful

                        //Compare the password passed by the POST in the body and the 
                        //password stored in the DB after the insertion of the member
                        let storedPassword = getMemberPassword(newMember.id);
                        let areEqualPasswords = areEqualStrings(postOptions.password, storedPassword);
                        expect(areEqualPasswords).to.be.false;
                    });

                    done();
                });
            });
        });

    //Retrieve opertion
    describe('Retrieve: #retrieve() | parameters: id', () => {

        // Successfully retrieve a member
        it('characteristic', (done) => {
            // test logic
            done();
        });
    });
});