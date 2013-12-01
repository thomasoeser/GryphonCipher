/*
GryphonCipher v1.0.0. implementation in JavaScript
Copyright 2013 Thomas Oeser, Furious Gryphon Software
http://furiousgryphon.com/scripts/gryphoncipher.html  
MIT License: http://furiousgryphon.com/gryphoncipher-license.html
Dependencies
SHA256: http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js
*/
var GryphonCipher = {
	encrypt: function (data,password)
	{
		data = data + " ";
		var msgArray = data.split("");
		password = password + "-" + password + "-" + password;
		password = CryptoJS.SHA256(password) + "";	
		var loopNr = Math.ceil(((msgArray.length) / 256));
		var i = 0;
		var totalPass = "";
		while (i < loopNr)
		{
			totalPass = totalPass + CryptoJS.SHA256(password + i);
			i++;
		}
		password = totalPass;
		var bitPass = ""; 
		for (i = 0, len = password.length; i < len; i++) {
			bitPass = bitPass + GryphonCipher.charTobit(password.charAt(i));
		}
		password = bitPass;
		var passwordArray = password.split("");
		var newI = 0; var nd = "";
			for (i = 0, len = msgArray.length; i < len; i++)
			{
				if (GryphonCipher.validChars(msgArray[i].charCodeAt(0)) == 1)
				{
					if (passwordArray[i] == 1)
						{
							newI = GryphonCipher.altCharCode(msgArray[i].charCodeAt(0)) + 1;
						}
						else
						{
							newI = GryphonCipher.altCharCode(msgArray[i].charCodeAt(0)) - 1;
						}
						if (newI < 0){newI = 61;}
						if (newI > 61){newI = 0;}
						newI = GryphonCipher.altCharCodeReverse(newI);
						nd = nd + newI + "";
				}
				else
				{
					nd = nd + msgArray[i] + "";
				}
			}
		return nd.slice(0, -1);
	},
	decrypt: function (data,password)
		{
			data = data + " ";
			var msgArray = data.split("");
			password = password + "-" + password + "-" + password;
			password = CryptoJS.SHA256(password) + "";	
			var loopNr = Math.ceil(((msgArray.length) / 256));
			var i = 0;
			var totalPass = "";
			while (i < loopNr)
			{
				totalPass = totalPass + CryptoJS.SHA256(password + i);
				i++;
			}
			password = totalPass;
			var bitPass = ""; 
			for (i = 0, len = password.length; i < len; i++) {
				bitPass = bitPass + GryphonCipher.charTobit(password.charAt(i));
			}
			password = bitPass;	
			var passwordArray = password.split("");
			var newI = 0; var nd = "";
			for (i = 0, len = msgArray.length; i < len; i++)
			{
				if (GryphonCipher.validChars(msgArray[i].charCodeAt(0)) == 1)
				{
					if (passwordArray[i] == 1)
						{
							newI = GryphonCipher.altCharCode(eval(msgArray[i].charCodeAt(0))) - 1;
						}
						else
						{
							newI = GryphonCipher.altCharCode(eval(msgArray[i].charCodeAt(0))) + 1;
						}
						if (newI < 0){newI = 61;}
						if (newI > 61){newI = 0;}
						newI = GryphonCipher.altCharCodeReverse(newI);
						nd = nd + newI + "";
				}
				else
				{
					nd = nd + msgArray[i] + "";
				}
			}
			return nd.slice(0, -1);
		},
	charTobit: function (c)
		{
			var a = "";
			if (c == "0"){a="0000";}
			if (c == "1"){a="1000";}
			if (c == "2"){a="0100";}
			if (c == "3"){a="1100";}
			if (c == "4"){a="0010";}
			if (c == "5"){a="1010";}
			if (c == "6"){a="0110";}
			if (c == "7"){a="1110";}
			if (c == "8"){a="0001";}
			if (c == "9"){a="1001";}
			if (c == "a"){a="0101";}
			if (c == "b"){a="1101";}
			if (c == "c"){a="0011";}
			if (c == "d"){a="1011";}
			if (c == "e"){a="0111";}
			if (c == "f"){a="1111";}
			return a;
		},
		bitToChar: function (b)
		{
			var a = "";
			if (b == "0000"){a = "0";}
			if (b == "1000"){a = "1";}
			if (b == "0100"){a = "2";}
			if (b == "1100"){a = "3";}
			if (b == "0010"){a = "4";}
			if (b == "1010"){a = "5";}
			if (b == "0110"){a = "6";}
			if (b == "1110"){a = "7";}
			if (b == "0001"){a = "8";}
			if (b == "1001"){a = "9";}
			if (b == "0101"){a = "a";}
			if (b == "1101"){a = "b";}
			if (b == "0011"){a = "c";}
			if (b == "1011"){a = "d";}
			if (b == "0111"){a = "e";}
			if (b == "1111"){a = "f";}
			return a;
		},
		validChars: function (c)
		{
			var a = 0;
			if ((c >= 48) && (c <= 57)) 	{a=1;}
			if ((c >= 65) && (c <= 90)) 	{a=1;}
			if ((c >= 97) && (c <= 122)) 	{a=1;}
			return a;
		},
		altCharCode: function (c)
		{
			var a = 0;
			if (c == 48) {a=0;}if (c == 49) {a=1;}if (c == 50) {a=2;}if (c == 51) {a=3;}if (c == 52) {a=4;}
			if (c == 53) {a=5;}if (c == 54) {a=6;}if (c == 55) {a=7;}if (c == 56) {a=8;}if (c == 57) {a=9;}
			if (c == 65) {a=10;}if (c == 66) {a=11;}if (c == 67) {a=12;}if (c == 68) {a=13;}if (c == 69) {a=14;}
			if (c == 70) {a=15;}if (c == 71) {a=16;}if (c == 72) {a=17;}if (c == 73) {a=18;}if (c == 74) {a=19;}
			if (c == 75) {a=20;}if (c == 76) {a=21;}if (c == 77) {a=22;}if (c == 78) {a=23;}if (c == 79) {a=24;}
			if (c == 80) {a=25;}if (c == 81) {a=26;}if (c == 82) {a=27;}if (c == 83) {a=28;}if (c == 84) {a=29;}
			if (c == 85) {a=30;}if (c == 86) {a=31;}if (c == 87) {a=32;}if (c == 88) {a=33;}if (c == 89) {a=34;}
			if (c == 90) {a=35;}
			if (c == 97) {a=36;}if (c == 98) {a=37;}if (c == 99) {a=38;}if (c == 100) {a=39;}if (c == 101) {a=40;}
			if (c == 102) {a=41;}if (c == 103) {a=42;}if (c == 104) {a=43;}if (c == 105) {a=44;}if (c == 106) {a=45;}
			if (c == 107) {a=46;}if (c == 108) {a=47;}if (c == 109) {a=48;}if (c == 110) {a=49;}if (c == 111) {a=50;}
			if (c == 112) {a=51;}if (c == 113) {a=52;}if (c == 114) {a=53;}if (c == 115) {a=54;}if (c == 116) {a=55;}	
			if (c == 117) {a=56;}if (c == 118) {a=57;}if (c == 119) {a=58;}if (c == 120) {a=59;}if (c == 121) {a=60;}
			if (c == 122) {a=61;}
			return a;
		},
		altCharCodeReverse: function (c)
		{
			var a = "";
			if (c == 0) {a="0";}if (c == 1) {a="1";}if (c == 2) {a="2";}if (c == 3) {a="3";}if (c == 4) {a="4";}
			if (c == 5) {a="5";}if (c == 6) {a="6";}if (c == 7) {a="7";}if (c == 8) {a="8";}if (c == 9) {a="9";}
			if (c == 10) {a="A";}if (c == 11) {a="B";}if (c == 12) {a="C";}if (c == 13) {a="D";}if (c == 14) {a="E";}
			if (c == 15) {a="F";}if (c == 16) {a="G";}if (c == 17) {a="H";}if (c == 18) {a="I";}if (c == 19) {a="J";}
			if (c == 20) {a="K";}if (c == 21) {a="L";}if (c == 22) {a="M";}if (c == 23) {a="N";}if (c == 24) {a="O";}
			if (c == 25) {a="P";}if (c == 26) {a="Q";}if (c == 27) {a="R";}if (c == 28) {a="S";}if (c == 29) {a="T";}
			if (c == 30) {a="U";}if (c == 31) {a="V";}if (c == 32) {a="W";}if (c == 33) {a="X";}if (c == 34) {a="Y";}
			if (c == 35) {a="Z";}
			if (c == 36) {a="a";}if (c == 37) {a="b";}if (c == 38) {a="c";}if (c == 39) {a="d";}if (c == 40) {a="e";}
			if (c == 41) {a="f";}if (c == 42) {a="g";}if (c == 43) {a="h";}if (c == 44) {a="i";}if (c == 45) {a="j";}
			if (c == 46) {a="k";}if (c == 47) {a="l";}if (c == 48) {a="m";}if (c == 49) {a="n";}if (c == 50) {a="o";}
			if (c == 51) {a="p";}if (c == 52) {a="q";}if (c == 53) {a="r";}if (c == 54) {a="s";}if (c == 55) {a="t";}
			if (c == 56) {a="u";}if (c == 57) {a="v";}if (c == 58) {a="w";}if (c == 59) {a="x";}if (c == 60) {a="y";}
			if (c == 61) {a="z";}
			return a;
		}
};