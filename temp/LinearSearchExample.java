import java.util.Scanner;

public class LinearSearchExample {

    /**
     * Performs a linear search on the given array.
     * @param arr The array to search in.
     * @param target The value to search for.
     * @return The index of the target if found, otherwise -1.
     */
    public static int linearSearch(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1; // Empty or null array
        }
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Found at index i
            }
        }
        return -1; // Not found
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            // Input array size
            System.out.print("Enter number of elements: ");
            int n = scanner.nextInt();
            if (n <= 0) {
                System.out.println("Array size must be positive.");
                return;
            }

            int[] arr = new int[n];

            // Input array elements
            System.out.println("Enter " + n + " integers:");
            for (int i = 0; i < n; i++) {
                arr[i] = scanner.nextInt();
            }

            // Input target value
            System.out.print("Enter the number to search: ");
            int target = scanner.nextInt();

            // Perform search
            int index = linearSearch(arr, target);

            // Output result
            if (index != -1) {
                System.out.println("Element found at index: " + index);
            } else {
                System.out.println("Element not found in the array.");
            }

        } catch (Exception e) {
            System.out.println("Invalid input. Please enter integers only.");
        } finally {
            scanner.close();
        }
    }
}
