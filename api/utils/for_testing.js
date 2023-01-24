const palindrome = (string) => {
    if (typeof string === 'undefined') return;
    return string.split('').reverse('').join('')
};

const average = arr => {
    if (!arr.length) return 0;
    let sum = 0;
    arr.forEach(num => { sum += num })
    return sum / arr.length;
}

module.exports = {
	palindrome,
	average,
};
