function _jsBeforeLoad() {
    _addCloseEvent();
//  alert(1243);
}

function _addCloseEvent() {
    document.addEventListener('bootpayclose', function (e) { if (window.BootpayClose && window.BootpayClose.postMessage) { BootpayClose.postMessage('결제창이 닫혔습니다'); } });
}

function _requestPayment(payload) {
    Bootpay.requestPayment(JSON.parse(payload))
    .then(async function(res) {
        if (res.event === 'confirm') {
          window.BootpayConfirm(JSON.stringify(res))(function(d) {

            if(d === true) _transactionConfirm();
          });
        }
        else if (res.event === 'issued') { BootpayIssued(JSON.stringify(res));  }
        else if (res.event === 'done') { BootpayDone(JSON.stringify(res));  }
    }, function(res) {
        if (res.event === 'error') { BootpayError(JSON.stringify(res)); }
        else if (res.event === 'cancel') { BootpayCancel(JSON.stringify(res)); }
    });
}

function _requestSubscription(payload) {
    Bootpay.requestSubscription(JSON.parse(payload))
    .then(async function(res){
        if (res.event === 'confirm') {
          window.BootpayConfirm(JSON.stringify(res))(function(d) {

            if(d === true) _transactionConfirm();
          });
        }
        else if (res.event === 'issued') { BootpayIssued(JSON.stringify(res));  }
        else if (res.event === 'done') { BootpayDone(JSON.stringify(res));  }
    }, function(res) {
        if (res.event === 'error') { BootpayError(JSON.stringify(res)); }
        else if (res.event === 'cancel') { BootpayCancel(JSON.stringify(res)); }
    });
}

function _requestAuthentication(payload) {
    Bootpay.requestAuthentication(JSON.parse(payload))
    .then(async function(res){
        if (res.event === 'confirm') {
          window.BootpayConfirm(JSON.stringify(res))(function(d) {

            if(d === true) _transactionConfirm();
          });
        }
        else if (res.event === 'issued') { BootpayIssued(JSON.stringify(res));  }
        else if (res.event === 'done') { BootpayDone(JSON.stringify(res));  }
    }, function(res) {
        if (res.event === 'error') { BootpayError(JSON.stringify(res)); }
        else if (res.event === 'cancel') { BootpayCancel(JSON.stringify(res)); }
    });
}

function _transactionConfirm() {
    Bootpay.confirm()
    .then(function(res){
        if (res.event === 'issued') { BootpayIssued(JSON.stringify(res));  }
        else if (res.event === 'done') { BootpayDone(JSON.stringify(res));  }
    }, function(res) {
        if (res.event === 'error') { BootpayError(JSON.stringify(res)); }
        else if (res.event === 'cancel') { BootpayCancel(JSON.stringify(res)); }
    });
}

function _removePaymentWindow() {
    Bootpay.dismiss();
}
