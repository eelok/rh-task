const {parseUserFromRequest} = require('./validate')

test("should parse user", async function() {
    const request = {
        headers: {
            authorization: `Basic bWFyaWFAZ21haWwuY29tOjEyMzQ=`
        }
    }
    const [username, password] = parseUserFromRequest(request);

    expect(username).toBe("maria@gmail.com")
    expect(password).toBe("1234")
});

test("should parse user", async function() {
    const request = {
        headers: {
            
        }
    }
    const [username, password] = parseUserFromRequest(request);

    expect(username).toBe("maria@gmail.com")
    expect(password).toBe("1234")
});