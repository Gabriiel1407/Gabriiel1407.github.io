async function getAPIData() {
 let url = "https://csumb.space/api/cityInfoAPI.php?zip=93955";
  try {
       let stateResult = document.querySelector("#State");
       stateResult.addEventListener("dropdown", async function() {
            let stateResult = await fetch(" https://csumb.space/api/allStatesAPI.php");
       });
       const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
       const data = await response.json();
       console.log(data);
       } catch (err) {
             if (err instanceof TypeError) {
                alert("Error accessing API endpoint (network failure)");
              } else {
                alert(err.message);
              }
      } //catch
}
