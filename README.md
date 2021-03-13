**STANDAR API**

_{root.api}/{version}/{grouping}/{endpoint}_

**SAMPLE:**

_http://mern-api.kodaskrip.com/v1/auth/login_

**Standar status response**


| Code | Response | Status |
| ------ | ------ | ------ |
| 200 | OK  | Call API Success |
| 201 | Created  | Post Success |
| 400 | Bad Request  | Error on client side (ex: salah input data etc..) |
| 401 | Unauthorized | User not authorized to the request |
| 403 | Forbidden | User not allowed to access |
| 404 | Not found | Request endpoint not found |
| 500 | Internal server error | Error on server side |
| 502 | Bad gateway | Invalid response from another request |

- [x] **GROUP: Authentication**

- [ ] Login task
  - _{root.api}/{version}/auth/login_

- [ ] Register
  - _{root.api}/{version}/auth/register_

req: 
;;;
{
    'name' : 'Testing',
    'email' : 'testing@mail.com',
    'password' : 'secret123',
}
;;;

res: 
;;;
{
    'message' : 'Register success',
    'data' : {
        'id' : 1,
        'name' : 'Testing',
        'email' : 'testing@mail.com',
        'password' : 'secret123',
    }
}
;;;

err-response : 
401 -> Input yang anda masukan tidak valid


- [x] **GROUP: BLOG**
- [ ] Create Blog post
- [ ] GET Blog Post
- [ ] Update Blog post
- [ ] Delete Blog post
