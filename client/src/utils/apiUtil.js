// function ApiUtil() {
//   const apiRoot = "https://cors-anywhere.herokuapp.com/https://sweetwaterschools.instructure.com/api/v1/";
//   const token = `access_token=${process.env.REACT_APP_ACCESS_TOKEN}`;

//   function buildRequestUri(args) {
//     let url = apiRoot + args.resource;
//     if (args.resourceId) { url = url + "/" + args.resourceId; }
//     if (args.nestedResource) { url = url + "/" + args.nestedResource; }
//     if (args.queries) {
//       for (let i = 0; i < args.queries.length; i++) {
//         url = url + "?" + args.queries[i];
//       }
//       url = url + "&" + token;
//     } else {
//       url = url + "?" + token;
//     }
//     console.log(url);
//     return (url);
//   }

//   return({
//     buildRequestUri: buildRequestUri
//   });
// }

// export default ApiUtil;