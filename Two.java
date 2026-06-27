import java.util.*;

class Two {

    public static void main(String[] args) {
        int target = 40;
        int[] arr = { 10, 20, 30, 40, 50 };
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                int sum = 0;
                sum = arr[i] + arr[j];
                if (target == sum) {
                    System.out.println(arr[i] + " " + arr[j] + " sum value" + sum + " target value" + target);
                }
            }
        }
    }

}
