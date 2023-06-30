#include <string>
#include <iostream>
#include <unistd.h>

using namespace std;

int main() {
	string mystr;
	cout << "What's your name? ";
	getline (cin, mystr);
	cout << "Hello " << mystr << ".\n";
    // sleep for 10 seconds (Test Timeout)
    cout << "Wait for 5 seconds\n";
    usleep(5000000);
    return 0;
}
