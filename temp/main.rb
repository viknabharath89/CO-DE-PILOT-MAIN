# Ruby program to take user input and display a message

# Get user's name
print "Enter your name: "
name = gets.chomp  # removes the newline character

# Get user's age with validation
age = nil
loop do
  print "Enter your age: "
  input = gets.chomp
  if input.match?(/^\d+$/) # check if input is a positive integer
    age = input.to_i
    break
  else
    puts "Invalid input. Please enter a valid number."
  end
end

# Output the result
puts "Hello, #{name}! You are #{age} years old."
