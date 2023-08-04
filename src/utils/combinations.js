export const generateJointExpensesModel = (num) => {
  if (num < 2 || num > 8) {
    return false;
  }

  const jointExpensesModel = [];

  // Generate combinations of 2 elements
  for (let i = 0; i <= num; i++) {
    for (let j = i + 1; j <= num; j++) {
      jointExpensesModel.push([[i, j], 0]);
    }
  }

  // Generate combinations of 3 elements
  if (num >= 3) {
    for (let i = 0; i <= num - 2; i++) {
      for (let j = i + 1; j <= num - 1; j++) {
        for (let k = j + 1; k <= num; k++) {
          jointExpensesModel.push([[i, j, k], 0]);
        }
      }
    }
  }

  // Generate combinations of 4 elements
  if (num >= 4) {
    for (let i = 0; i <= num - 3; i++) {
      for (let j = i + 1; j <= num - 2; j++) {
        for (let k = j + 1; k <= num - 1; k++) {
          for (let l = k + 1; l <= num; l++) {
            jointExpensesModel.push([[i, j, k, l], 0]);
          }
        }
      }
    }
  }

  // Generate combinations of 5 elements
  if (num >= 5) {
    for (let i = 0; i <= num - 4; i++) {
      for (let j = i + 1; j <= num - 3; j++) {
        for (let k = j + 1; k <= num - 2; k++) {
          for (let l = k + 1; l <= num - 1; l++) {
            for (let m = l + 1; m <= num; m++) {
              jointExpensesModel.push([[i, j, k, l, m], 0]);
            }
          }
        }
      }
    }
  }

  // Generate combinations of 6 elements
  if (num >= 6) {
    for (let i = 0; i < num - 5; i++) {
      for (let j = i + 1; j <= num - 4; j++) {
        for (let k = j + 1; k <= num - 3; k++) {
          for (let l = k + 1; l <= num - 2; l++) {
            for (let m = l + 1; m <= num - 1; m++) {
              for (let n = m + 1; n <= num; n++) {
                jointExpensesModel.push([[i, j, k, l, m, n], 0]);
              }
            }
          }
        }
      }
    }
  }

  // Generate combinations of 7 elements
  if (num >= 7) {
    for (let i = 0; i <= num - 6; i++) {
      for (let j = i + 1; j <= num - 5; j++) {
        for (let k = j + 1; k <= num - 4; k++) {
          for (let l = k + 1; l <= num - 3; l++) {
            for (let m = l + 1; m <= num - 2; m++) {
              for (let n = m + 1; n <= num - 1; n++) {
                for (let o = n + 1; o <= num; o++) {
                  jointExpensesModel.push([[i, j, k, l, m, n, o], 0]);
                }
              }
            }
          }
        }
      }
    }
  }

  // Generate combinations of 8 elements
  if (num === 8) {
    for (let i = 0; i <= num - 7; i++) {
      for (let j = i + 1; j <= num - 6; j++) {
        for (let k = j + 1; k <= num - 5; k++) {
          for (let l = k + 1; l <= num - 4; l++) {
            for (let m = l + 1; m <= num - 3; m++) {
              for (let n = m + 1; n <= num - 2; n++) {
                for (let o = n + 1; o <= num - 1; o++) {
                  for (let p = o + 1; p <= num; p++) {
                    jointExpensesModel.push([[i, j, k, l, m, n, o, p], 0]);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return jointExpensesModel;
};
