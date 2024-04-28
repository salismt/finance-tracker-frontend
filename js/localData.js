
export function dashboardData() {
  return {
    "data": {
      "current_balance": 10000,
      "total_expense": 5000,
      "total_income": 15000,
      "balance_history": [
        {
          "date": "2024-01-15T00:00:00+00:00",
          "balance": 7000
        },
        {
          "date": "2024-01-16T00:00:00+00:00",
          "balance": 8000
        }
      ],
      "categories":[
        {
          "percentage": 30.5,
          "name": "food"
        },
        {
          "percentage": 16,
          "name": "transport"
        }
      ],
      "statements": [{
        "name": "mcdonald",
        "category": "food",
        "date": "2020-12-09T16:09:53+00:00",
        "currency": "IDR",
        "amount": 300,
        "type": "expense"
      }]
    }
  }
}

export function transactionData() {
  return {
    "data": [
      {
        "name": "mcdonald",
        "category": "food",
        "date": "2020-12-09T16:09:53+00:00",
        "currency": "IDR",
        "amount": 300,
        "type": "expense"
      },
      {
        "name": "mcdonald",
        "category": "food",
        "date": "2020-12-09T16:09:53+00:00",
        "currency": "IDR",
        "amount": 300,
        "type": "expense"
      }
    ]
  }
}

export function balanceData() {
  return {
    "data": {
      "balance": 8000
    }
  }
}

export function categoryData() {
  return {
    "data": {
      "category": [
        {
          "key": "food"
        },
        {
          "key": "transport"
        }
      ]
    }
  }
}