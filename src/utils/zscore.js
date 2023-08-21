export default function zScore(val, arr) {

    const n = arr.length;
    const mean = arr.reduce((a, b) => a + b) / n;
    const std = Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);

    return (val - mean) / std

}