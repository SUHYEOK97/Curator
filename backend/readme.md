# ๐ API

> ์ ์  ๊ด๋ จ

|REST|Description|URL|form-data|Parameter|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|--------|
|**GET**|ํ์ฌ ๋ก๊ทธ์ธ ์ ์ |`http://127.0.0.1:9000/curation/currentLogin`|||String: name<br>String: email|
|**GET**|๋ก๊ทธ์์|`http://127.0.0.1:9000/curation/user/logout`||||
|**GET**|์์ ๋ก๊ทธ์ธ|`http://127.0.0.1:9000/curation/google/auth`||code|Int: code<br>String: message<br>Boolean: check<br>String: email<br>String: name|
|**POST**|ํ๋ก์ฐํ๊ธฐ|`http://localhost:9000/curation/follow/{followingNickname}`|                       String:nickname                        ||String:message("success")|
|**GET**|ํ๋ก์ ๋ฆฌ์คํธ|`http://localhost:9000/curation/follow/{nickname}/followers`|||List [<br/>String: userId<br/> String: email<br/> String: name<br/>String: nickname<br/> LocalDateTime createdDate ]|
|**GET**|ํ๋ก์ ๋ฆฌ์คํธ|`http://localhost:9000/curation/follow/{nickname}/followings`|||List [<br/>String: userId<br/> String: email<br/> String: name<br/>String: nickname<br/> LocalDateTime createdDate ]|
|**DELETE**|ํ๋ก์ฐ ์ทจ์|`http://localhost:9000/curation/follow/{followingNickname}`|                       String:nickname                        ||String:message("success")|
|**GET**|์ ์  ๊ฒ์|`http://localhost:9000/curation/search/{nickname}`|||List [<br/>String: userId<br/> String: email<br/> String: name<br/>String: nickname<br/> LocalDateTime createdDate ]|
|**GET**|๋ง์ดํ์ด์ง ๋ณด๊ธฐ|`GET http://localhost:9000/curation/userInfo/{nickname}`|||String: nickname<br>String: introduction<br>String: profileImg<br/>String: bgImg<br/>followings, followers, myPagePostDtos|
|**PUT**|๋ง์ดํ์ด์ง ์์ |`PUT http://localhost:9000/curation/userInfo`|String: nickName<br> String: introduction<br> String: profileImg<br> String: bgImg|||

> ๊ฒ์๊ธ ๊ด๋ จ

|    REST    |           Description            |                             URL                              |                   Formdata                    |                  Return Type / Return Value                  |
| :--------: | :------------------------------: | :----------------------------------------------------------: | :-------------------------------------------: | :----------------------------------------------------------: |
|  **POST**  |           ๊ฒ์๋ฌผ ์์ฑ            |          `http://localhost:9000/curation/post/list`          | email, title, description, ingredients, files |                                                              |
|  **GET**   |       ์ ์ฒด ๊ฒ์๋ฌผ ๋ถ๋ฌ์ค๊ธฐ       |          `http://localhost:9000/curation/post/list`          |                                               |                                                              |
|  **GET**   |    ํน์  ๊ฒ์๋ฌผ ์์ธ ๋ถ๋ฌ์ค๊ธฐ     |       `http://localhost:9000/curation/post/{post_id}`        |                                               |                                                              |
|  **PUT**   |      ํน์  ๊ฒ์๋ฌผ ์์ธ ์์        |       `http://localhost:9000/curation/post/{post_id}`        |                                               |                                                              |
| **DELETE** |         ํน์  ๊ฒ์๋ฌผ ์ญ์          |       `http://localhost:9000/curation/post/{post_id}`        |                                               |                                                              |
|  **POST**  |            ๋๊ธ ์์ฑ             | `http://localhost:9000/curation/post/{post_id}/commentList`  |            email, content, postId             |                                                              |
|  **GET**   |     ํน์  ๊ฒ์๋ฌผ ๋๊ธ ๋ฆฌ์คํธ      |  `http://localhost:9000/curation/post/{postId}/commentList`  |                                               |                                                              |
|  **GET**   |     ํน์  ๋๊ธ ์์ธ ๋ถ๋ฌ์ค๊ธฐ      | `http://localhost:9000/curation/post/{post_id}/commentList/{comment_id}` |                                               |                                                              |
|  **PUT**   |        ํน์  ๋๊ธ ์์ ํ๊ธฐ        | `http://localhost:9000/curation/post/{post_id}/commentList/{comment_id}` |                                               |                                                              |
| **DELETE** |        ํน์  ๋๊ธ ์ญ์ ํ๊ธฐ        | `http://localhost:9000/curation/post/{post_id}/commentList/{comment_id}` |                                               |                                                              |
|  **POST**  |       ๊ฒ์๋ฌผ ์ข์์ ๋๋ฅด๊ธฐ       |     `POST http://localhost:9000/curation/like/{postId}`      |               String: nickname                |                  String:message("success")                   |
|  **GET**   | ๊ฒ์๋ฌผ ์ข์์ ๋๋ฅธ ์ฌ๋๋ค ๋ฆฌ์คํธ |   `GET http://localhost:9000/curation/like/{postId}/list`    |                                               | List [<br/>String: userId<br/> String: email<br/> String: name<br/>String: nickname<br> LocalDateTime createdDate ] |
| **DELETE** |        ๊ฒ์๋ฌผ ์ข์์ ์ทจ์        |    `DELETE http://localhost:9000/curation/like/{postId}`     |               String: nickname                |                                                              |

> ๋ ์ํผ ๊ด๋ จ

|REST|Description|URL|Formdata|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|
|**POST**|๋ ์ํผ ์คํฌ๋ฉ/์คํฌ๋ฉ ์ทจ์|`http://localhost:9000/curation/scrap/{recipe_id}`|nickname|String:message("success")/<br />String:message("delete success")|
|**GET**|ํด๋น ๋ ์ํผ ์คํฌ๋ฉํ ์ ์  ๋ชฉ๋ก|`http://localhost:9000/curation/scrap/{recipe_id}/userList`||List|
|**GET**|ํด๋น ์ ์ ๊ฐ ์คํฌ๋ฉํ ๋ ์ํผ ๋ชฉ๋ก|`http://localhost:9000/curation/scrap/{nickname}/recipeList`||List|
|**GET**|์คํฌ๋ฉ ์๋ฅผ ๊ธฐ์ค์ผ๋ก ์ ์ฒด ๋ชฉ๋ก|`http://localhost:9000/curation/scrap/getAllRecipe/orderByScrapCount`||List|
|**POST**|์๋ ฅ๋ ์ฌ๋ฃ ๋ง์ถค ์ถ์ฒ ๋ ์ํผ|      `http://localhost:9000/curation/getRecommendList`       |List<String>:ingredients<br>boolean: check|Long: RECIPE_ID<br>String: RECIPE_NM_KO(๋ ์ํผ์ด๋ฆ)<br>String: IMG_URL<br>Double: rate<br> List<String>:ingredientEntities(๋ ์ํผ ์ฌ๋ฃ๋ค)<br>List<String> userSelectIngredients(์ ์ ๊ฐ ์ ํํ ์ฌ๋ฃ๋ค)|

> Util

|REST|Description|URL|Parameter|Return Type / Return Value|
|:------:|:------:|:---:|:---:|:----:|
|**GET**|๋ ์ํผ ์๋ฆฌ์ ๋ณด DB ์ถ๊ฐ|`http://127.0.0.1:9000/curation/addRecipe`|||
|**GET**|๋ ์ํผ ์๋ฆฌ๊ณผ์  DB ์ถ๊ฐ|`http://127.0.0.1:9000/curation/addRecipeProcess`|||
|**GET**|๋ ์ํผ ์๋ฆฌ์ฌ๋ฃ DB ์ถ๊ฐ|`http://127.0.0.1:9000/curation/addRecipeIngredient`|||
