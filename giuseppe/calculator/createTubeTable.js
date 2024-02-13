/* 
 * The MIT License
 *
 * Copyright 2020 Giuseppe Amato
 * giuseppe.amato@vtadiy.com
 * VTADIY - http://www.vtadiy.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var data = [
    {
      "name": "101D",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2
    },
    {
      "name": "12AT7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "12AU7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2.75
    },
    {
      "name": "12AX7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1
    },
    {
      "name": "12AY7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1.5
    },
    {
      "name": "12BH7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 3.5
    },
    {
      "name": "12E1 ",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 35
    },
    {
      "name": "12SJ7",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "12SQ7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "205D",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 14
    },
    {
      "name": 211,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 75
    },
    {
      "name": "2A3",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 15
    },
    {
      "name": "2A3-40 JJ",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 40
    },
    {
      "name": "300B",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 40
    },
    {
      "name": "300B-XLS(EML)",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 40
    },
    {
      "name": "3A5",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "417A",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 4.5
    },
    {
      "name": 45,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 10
    },
    {
      "name": "4P1L",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 7.5
    },
    {
      "name": 5687,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 4.2
    },
    {
      "name": 5751,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.8
    },
    {
      "name": 5842,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 4.5
    },
    {
      "name": 5881,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 23
    },
    {
      "name": 5902,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 4.1
    },
    {
      "name": 5977,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 3.3
    },
    {
      "name": "5AQ5",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "5V6",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": 6005,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": 6021,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.7
    },
    {
      "name": 6072,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1.5
    },
    {
      "name": 6111,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1.1
    },
    {
      "name": "6336A",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": 6360,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 5
    },
    {
      "name": 6528,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": 6550,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 42
    },
    {
      "name": 6688,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 2.7
    },
    {
      "name": 6888,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 8
    },
    {
      "name": 6973,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "6AH4GT",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 7.5
    },
    {
      "name": "6AH6",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 3.2
    },
    {
      "name": "6AK6",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 2.75
    },
    {
      "name": "6AQ5",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "6AQ8",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "6AS7G",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 14
    },
    {
      "name": "6AS7GC",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 13
    },
    {
      "name": "6AU6",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 3
    },
    {
      "name": "6BK5",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 9
    },
    {
      "name": "6BQ5",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "6BQ6GTB",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 11
    },
    {
      "name": "6BQ7A",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2
    },
    {
      "name": "6BX7GT",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 10
    },
    {
      "name": "6C33C(2 cath)",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 60
    },
    {
      "name": "6C41C",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": "6CA7",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 25
    },
    {
      "name": "6CD6GA",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 20
    },
    {
      "name": "6CG7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 3.5
    },
    {
      "name": "6CK4",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "6DJ8",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1.8
    },
    {
      "name": "6DQ6-B",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 18
    },
    {
      "name": "6GM8",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.6
    },
    {
      "name": "6GU7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 3
    },
    {
      "name": "6H30",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 4
    },
    {
      "name": "6H7C",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 5.5
    },
    {
      "name": "6J1",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 1.8
    },
    {
      "name": "6J5",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "6J7",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 0.83
    },
    {
      "name": "6JE6A",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": "6JE6B",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": "6JN6",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 17.5
    },
    {
      "name": "6JQ6",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 10
    },
    {
      "name": "6K6GT",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 8.5
    },
    {
      "name": "6KX8",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "6L6G",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 19
    },
    {
      "name": "6L6GC",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": "6LQ6",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": "6N16B",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.9
    },
    {
      "name": "6N17B",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.9
    },
    {
      "name": "6N1P",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2.2
    },
    {
      "name": "6N23P",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1.8
    },
    {
      "name": "6N2P",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.8
    },
    {
      "name": "6N2P-EV",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.8
    },
    {
      "name": "6N6P",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 4.8
    },
    {
      "name": "6N7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 5.5
    },
    {
      "name": "6N7G",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 5.5
    },
    {
      "name": "6N7GT",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 5.5
    },
    {
      "name": "6N7P",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 5.5
    },
    {
      "name": "6N7S",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 5.5
    },
    {
      "name": "6P1P-EV",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "6P30B",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 5.5
    },
    {
      "name": "6P31S",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "6P3S",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 20
    },
    {
      "name": "6S19P",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 11
    },
    {
      "name": "6S3P-EV",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 3
    },
    {
      "name": "6S4A",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 8.5
    },
    {
      "name": "6SJ7",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "6SL7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1
    },
    {
      "name": "6SN7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 5
    },
    {
      "name": "6SQ7",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "6U8APentodeSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 3
    },
    {
      "name": "6U8ATriodeSect",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "6V6",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "6V6GT",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "6V6S",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "6W6GT",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 10
    },
    {
      "name": "6Y6GT",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12.5
    },
    {
      "name": 7591,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 19
    },
    {
      "name": 7868,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 19
    },
    {
      "name": "7AK7",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 8.5
    },
    {
      "name": 805,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 125
    },
    {
      "name": 807,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": 809,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": "811A",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 45
    },
    {
      "name": "8298A",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 35
    },
    {
      "name": "829B",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 45
    },
    {
      "name": 8417,
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 35
    },
    {
      "name": 845,
      "tubeType": "triode",
      "maxAnodePowerDissipation": 100
    },
    {
      "name": "A2134",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 9
    },
    {
      "name": "CK5654",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 1.65
    },
    {
      "name": "CK6336A",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": "CK6688",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 2.7
    },
    {
      "name": "CV1040",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 25
    },
    {
      "name": "CV1936",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 0.83
    },
    {
      "name": "CV2798",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 5
    },
    {
      "name": "CV3998",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 2.7
    },
    {
      "name": "CV515",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12.5
    },
    {
      "name": "CV591",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "CV808",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "D3A",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 4.2
    },
    {
      "name": "DCC90",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "DO24",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 25
    },
    {
      "name": "E180F",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 2.7
    },
    {
      "name": "E188CC",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1.8
    },
    {
      "name": "E55L",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 10
    },
    {
      "name": "E88CC",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1.8
    },
    {
      "name": "EC8020",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 8
    },
    {
      "name": "ECC180",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2
    },
    {
      "name": "ECC808",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "ECC81",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "ECC82",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2.75
    },
    {
      "name": "ECC83",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1
    },
    {
      "name": "ECC85",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "ECC88",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1.8
    },
    {
      "name": "ECC99",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 3.5
    },
    {
      "name": "ECF80PentodeSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 1.7
    },
    {
      "name": "ECF80TriodeSect",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1.5
    },
    {
      "name": "ECL80PentodeSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 3.5
    },
    {
      "name": "ECL80TriodeSect",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1
    },
    {
      "name": "ECL82PentodeSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 7
    },
    {
      "name": "ECL82TriodeSect",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1
    },
    {
      "name": "ECL83PentodeSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 5.4
    },
    {
      "name": "ECL83TriodeSect",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 3.5
    },
    {
      "name": "ECL84PentodeSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 4
    },
    {
      "name": "ECL84TriodeSect",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1
    },
    {
      "name": "ECL85PentodeSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 7
    },
    {
      "name": "ECL85TriodeSect",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "ECL86PentodeSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 9
    },
    {
      "name": "ECL86TriodeSect",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "EF80",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "EF86",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 1
    },
    {
      "name": "EF94",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 3
    },
    {
      "name": "EFL200PowerSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 5
    },
    {
      "name": "EFL200PreSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 1.5
    },
    {
      "name": "EL34",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 25
    },
    {
      "name": "EL36",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "EL506",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 19
    },
    {
      "name": "EL803",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 9
    },
    {
      "name": "EL84",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "EL86",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "EL90",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12
    },
    {
      "name": "EL91",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 4
    },
    {
      "name": "EL95",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 6
    },
    {
      "name": "GK71",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 125
    },
    {
      "name": "GM70",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 125
    },
    {
      "name": "GU-50",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 40
    },
    {
      "name": "GU81",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 450
    },
    {
      "name": "KT120",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 60
    },
    {
      "name": "KT150",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 70
    },
    {
      "name": "KT66",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 30
    },
    {
      "name": "KT77",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 32
    },
    {
      "name": "KT88",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 35
    },
    {
      "name": "KT90",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 50
    },
    {
      "name": "NR47",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 25
    },
    {
      "name": "Nuvistor 7587",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1
    },
    {
      "name": "P27-500",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 25
    },
    {
      "name": "PCC88",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1.8
    },
    {
      "name": "PCL84PentodeSect",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 4
    },
    {
      "name": "PCL84TriodeSect",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 1
    },
    {
      "name": "PP5/400",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 25
    },
    {
      "name": "PP6/400",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 25
    },
    {
      "name": "PX25(Osram)",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 25
    },
    {
      "name": "PX4",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 15
    },
    {
      "name": "QQE03-10",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 5
    },
    {
      "name": "QQE03-12",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 5
    },
    {
      "name": "RCA-6146b",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 35
    },
    {
      "name": "SV572-10",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 125
    },
    {
      "name": "T100(KR)",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 100
    },
    {
      "name": "T110-1",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 100
    },
    {
      "name": "VR40",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 25
    },
    {
      "name": "VT-103",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "VT-104",
      "tubeType": "triode",
      "maxAnodePowerDissipation": 0.5
    },
    {
      "name": "VT-116",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 2.5
    },
    {
      "name": "VT-168A",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 12.5
    },
    {
      "name": "VT-91",
      "tubeType": "pentode",
      "maxAnodePowerDissipation": 0.83
    }
  ];

var createTubeTable=function(){
        var table = document.getElementById("tubeTable");

            tubes=data;
            for(var i=0;i<tubes.length;i++){
                var tr = document.createElement('tr');
                var num=document.createElement('td');
                var name = document.createElement('td');
                var tubeType = document.createElement('td');
                var anodeDissipation = document.createElement('td');
                //var link= document.createElement('td');
                
                num.appendChild(document.createTextNode(i+1.0));
                var url=document.createElement('a');
                //name.appendChild(document.createTextNode(url));
                name.appendChild(url);
                url.appendChild(document.createTextNode(tubes[i].name));
                url.title= "Go to calculator";
                url.href="javascript:tube1.setGraph(\""+tubes[i].name+"\");var url = location.href;location.href = \"#calculator\";history.replaceState(null,null,url);";
                tubeType.appendChild((document.createTextNode(tubes[i].tubeType)));
                anodeDissipation.appendChild(document.createTextNode(tubes[i].maxAnodePowerDissipation+"W"));
                //var url=document.createElement('a');
                //link.appendChild(url);
                //url.appendChild(document.createTextNode("Go to calculator"));
                //url.title= tubes[i].name;
                //url.href= "https://www.vtadiy.com/loadline-calculators/loadline-calculator/?tube="+tubes[i].name+"#calculator";               
                //url.href="javascript:tube1.setGraph(\""+tubes[i].name+"\");var url = location.href;location.href = \"#calculator\";history.replaceState(null,null,url);";
                //url.onclick="tube1.setGraph("+tubes[i].name+")";
                tr.appendChild(num);
                tr.appendChild(name);
                tr.appendChild(tubeType);
                tr.appendChild(anodeDissipation);
                //tr.appendChild(link);
                table.appendChild(tr);
            }
      
    };


