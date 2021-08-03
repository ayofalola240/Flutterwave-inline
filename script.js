const form = document.getElementById('payForm');
form.addEventListener("submit", payNow);
// async function sendToserver(e) {
//   e.preventDefault()
//   const response = {
//     amount: 10,
//     currency: "USD",
//     customer: {
//       name: "Flutterwave Developers",
//       email: "cornelius@gmail.com",
//       phone_number: "08102909304"
//     },
//     flw_ref: "SMXL9784001344029",
//     status: "successful",
//     tx_ref: "RX1",
//     transaction_id: 2151557
//   }
//   try {

//     const res = await axios({
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       url: 'http://127.0.0.1:5000/api/v1/checkout',
//       response
//     });

//     if (res.response.status === 'success') {
//       console.log('success')
//     }
//   } catch (err) {
//     console.log(err)
//   }

// }

function payNow(e) {
    e.preventDefault();
    // GET orderID and concate it with Date.now() to compute tx_ref;
    let tx_ref = '6104500174f61304b976cd09' + '|' + Date.now();
    //public_key must be kept in enviroment varaible.
    let public_key = "FLWPUBK-2c95c35ef1a3a95904aeada33aa88b10-X";

    FlutterwaveCheckout({
        public_key,
        tx_ref,
        amount: document.getElementById("amount").value,
        currency: "NGN",
        customer: {
            email: document.getElementById("email").value,
            phone_number: document.getElementById("phoneNumber").value,
            name: document.getElementById("fullName").value,
        },

        callback: (response) => { // specified callback function
            // console.log(response)
            const sendToserver = async (response) => {
                const data = { ...response }
                try {
                    const res = await axios({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        url: 'http://127.0.0.1:5000/api/v1/payment/verify',
                        data
                    });

                    if (res.response.status === 'success') {
                        console.log('success')
                    }
                } catch (err) {
                    console.log(err)
                }

            }
            console.log(response)
            const { status, tx_ref } = response;

            if (status === 'successful') {
                sendToserver(response)
                window.alert('Payment complete! tx_ref: ' + tx_ref);
            } else {
                window.alert('Payment is unsuccessful! tx_ref: ' + tx_ref);
            }

        },

        customizations: {
            title: "Jufo logistics",
            description: "FlutterWave Integration in Javascript."

            // logo: "flutterwave/usecover.gif",
        },
    });
}