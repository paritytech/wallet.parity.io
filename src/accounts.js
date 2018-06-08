'use strict';

(function() {
    var LOCAL_ACCOUNTS_KEY = '_parity::localAccounts';
    var localStorage = window.localStorage;
    var URL = window.webkitURL || window.URL;

    function getAccounts() {
        var data = localStorage.getItem(LOCAL_ACCOUNTS_KEY);

        if (!data) {
            return [];
        }

        try {
            data = JSON.parse(data);
        } catch (err) {
            return [];
        }

        if (!data || !data.store) {
            return [];
        }

        return Object.keys(data.store).map(function(key) { return Object.assign({ address: key }, data.store[key]); });
    }

    function make(tag, className, content) {
        var el = document.createElement(tag);

        el.className = className;
        if (content) el.textContent = content;

        return el;
    }

    function account(account) {
        var el = make('div', 'account');

        el.appendChild(make('span', 'address', account.address));
        el.appendChild(make('span', 'name', account.name));

        if (account.keyObject) {
            var file = new Blob([JSON.stringify(account.keyObject, null, '  ')], {type : 'application/json'});
            var button = make('a', 'download', 'Download');

            button.href = URL.createObjectURL(file);
            button.download = account.address + '.json';

            el.appendChild(button);
        } else {
            el.appendChild(make('span', 'download disabled', 'Address entry only'))
        }

        return el;
    }

    var fragment = document.createDocumentFragment();
    var accounts = getAccounts();

    if (accounts.length !== 0) {
        accounts.map(account).forEach(function(account) { fragment.appendChild(account); });
    } else {
        fragment.appendChild(make('p', 'no-accounts', 'No accounts found'));
    }

    document.getElementById('accounts').appendChild(fragment);
})();
