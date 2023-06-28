'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Le Minh Huy',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Vo Nhat Anh',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Tran Trung Tin',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4]; //

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; //

const displayMovements = function (movements) {
    containerMovements.innerHTML = '';

    movements.map(
        (mov, i) => {
            console.log(mov, i)
            const type = mov > 0 ? 'deposit' : 'withdrawal';
            const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov}€</div>
        </div>`;
            containerMovements.insertAdjacentHTML('afterbegin', html)
        }
    )
}

const createUser = (accs) => accs.forEach(
    acc => {
        acc.username = acc
            .owner
            .toLowerCase()
            .split(' ')
            .map(
                name => name[0]
            )
            .join('');

    });
createUser(accounts)

const calcDisplaybelance = function (movements) {
    const balance = movements.reduce(
        (mov, cur, i) =>
            mov + cur
        , 0
    )
    labelBalance.textContent = `${balance} EUR`
}

const calcDisplaySumary = function (movements) {
    const incomes = movements.filter(mov => mov > 0).reduce((mov, acc) => mov + acc, 0);
    const outcomes = movements.filter(mov => mov < 0).reduce((mov, acc) => mov + acc, 0);
    const interestcomes = movements.filter(mov => mov > 0).map(mov => (mov * 1.2) / 100).reduce((mov, acc) => mov + acc, 0);
    labelSumIn.innerHTML = `${incomes}€`;
    labelSumOut.innerHTML = `${Math.abs(outcomes)}€`;
    labelSumInterest.innerHTML = `${interestcomes}€`
}

//Event handle
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    let currentAccount;
    // console.log('hello');
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);
    if (currentAccount?.pin === Number(inputLoginPin.value)) { // .? nhằm kiểm tra xem chúng có tồn tại mã pin ko
        //Clear Input
        inputLoginPin.value = inputLoginUsername.value = '';
        inputLoginPin.blur()
        //Display UI message;
        labelWelcome.textContent = `Hello ${currentAccount.owner}`;
        containerApp.style.opacity = 100;

        //Display Movements;
        displayMovements(currentAccount.movements);

        //Display Balance;
        calcDisplaybelance(currentAccount.movements)

        //Display Summary;
        calcDisplaySumary(currentAccount.movements)
    }else{
        alert('Vui lòng nhập lại')
    }
})

/////////////////////////////////////////////////



// const checkDogs = function (dogsJulia, dogsKate) {
//     const dogsJuliaCorrected = dogsJulia.slice();
//     dogsJuliaCorrected.splice(0, 1);
//     dogsJuliaCorrected.splice(-2);
//     console.log(dogsJuliaCorrected);
//     const dogs = dogsJuliaCorrected.concat(dogsKate)
//     dogs.map((dog, i, arr) => {
//         console.log(i, dog);
//         if (dog >= 3) { return `The number ${i + 1} is ${dog} adult` } else { return `The number ${i + 1} is ${dog} puppy` }
//     })
// }

// console.log(checkDogs([3, 5, 2, 12, 7], [9, 16, 6, 8, 3]))

